from fastapi import APIRouter, Depends, HTTPException, Request
import logging

from ...schemas.apis.query import ChatQueryRequest
from ...dependencies.agents import get_unstructured_agent_executor, get_structured_agent_executor
from ...schemas.apis.user import get_session_id
from ...dependencies.rate_limiter import limiter

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat-query")

@router.post("/")
@limiter.limit("5/minute")
async def chat_query(
    request: Request,
    payload: ChatQueryRequest,
    session_id: str = Depends(get_session_id),
    unstructured_agent_executor = Depends(get_unstructured_agent_executor),
    structured_agent_executor = Depends(get_structured_agent_executor)
):
    try:
        logger.info(f"Received {payload.structure} query: {payload.question}")
        
        config = {"configurable": {"thread_id": session_id}}
        
        executor = structured_agent_executor if payload.structure == "structured" else unstructured_agent_executor
        input_state = {
            "question": payload.question,
            "structure": payload.structure,
            "messages": [("user", payload.question)]
        }
        response = await executor.ainvoke(input_state, config)
        
        if 'messages' in response and response['messages']:
            final_msg = response['messages'][-1]
            
            if hasattr(final_msg, "tool_calls") and isinstance(final_msg.tool_calls, list) and len(final_msg.tool_calls) > 0:
                # If the output is a tool call (structured output), return the arguments directly
                tool_call = final_msg.tool_calls[0]
                content = tool_call.get("args", tool_call)
            else:
                content = final_msg.content

            citations = response.get("citations", [])

            return {"response": content, "session_id": session_id, "citations": citations}
        else:
            return {"response": "I apologize, but I encountered an issue processing your request. Please try again.", "session_id": session_id, "citations": []}
        
    except Exception as e:
        logger.error(f"Error in {payload.structure} query: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))