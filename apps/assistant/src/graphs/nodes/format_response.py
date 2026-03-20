from operator import itemgetter
from langchain.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.language_models.chat_models import BaseChatModel
from dotenv import load_dotenv
from langchain_core.runnables import Runnable
from ...states.state import AgentState
from ...schemas.semantic_data import SemanticResponse
import logging
from langchain.schema import AIMessage, HumanMessage

load_dotenv()
logger = logging.getLogger(__name__)

def format_response_node(state: AgentState, llm: BaseChatModel | Runnable):
    """
    Formats the agent's final response into a structured JSON object.
    This node takes the state, extracts the last message as the agent's answer,
    and uses an LLM to format it into the SemanticResponse schema.
    """
    logger.info("Node: format_response_node")

    # If the llm is already wrapped with structured output from the agent creation, 
    # we might not need to call it again, but just in case:
    if hasattr(llm, "with_structured_output"):
        formatter_llm = llm.with_structured_output(SemanticResponse)
    else:
        formatter_llm = llm

    real_question = state.get('question', '')
    affirmative_words = ["yes", "ja", "ok", "y", "sure", "gjerne", "ja takk", "jepp"]
    if real_question.lower().strip() in affirmative_words and state.get('messages'):
        for msg in reversed(state['messages']):
            msg_type = getattr(msg, "type", msg[0] if isinstance(msg, tuple) else "unknown")
            text = getattr(msg, "content", msg[1] if isinstance(msg, tuple) else str(msg))
            if msg_type in ["human", "user"] or isinstance(msg, HumanMessage):
                if text.lower().strip() not in affirmative_words:
                    real_question = text
                    break

    last_msg = state['messages'][-1]
    agent_answer = getattr(last_msg, "content", last_msg[1] if isinstance(last_msg, tuple) else str(last_msg))

    formatter_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", """You are an expert content and data structurer.
Your task is to take an extracted text snippet from our database (which may include a short introductory phrase separated by '---') and map it into the strict 'SemanticResponse' JSON format.
Extract the short introductory phrase into the 'introduction' field.
In the 'summary' field, place the EXACT text excerpt from the agent's answer (everything after the '---' separator). DO NOT generate new text, simplify, or summarize it yourself. Provide the summary as-is in its original wording without the introductory phrase.
Extract any step-by-step instructions into the 'steps' array if they exist.
Extract any references, sources, or articles into the 'references' array.
Extract actionable links into 'useful_links'.
Ensure the JSON output exactly matches the required structure."""),
            ("human", "Original Question (User): {question}\n\nAgent's Answer (to format): {agent_answer}")
        ]
    )

    formatting_chain = formatter_prompt | formatter_llm

    structured_response = formatting_chain.invoke({
        "question": real_question,
        "agent_answer": agent_answer
    })
    
    # Check if the response is a Pydantic model (it should be) and dump to dict
    if hasattr(structured_response, "model_dump"):
        structured_response_dict = structured_response.model_dump()
    else:
        structured_response_dict = structured_response

    # Depending on LangGraph / LangChain expectations, we can store JSON in content
    # or just stringify it. We store as dict if standard, but langchain often prefers string or dict in an AIMessage
    # We will pass the dictionary payload properly formatted.
    import json
    message = AIMessage(content=json.dumps(structured_response_dict, ensure_ascii=False))
    current_messages = state.get('messages', [])
    current_messages.append(message)
    
    return {"messages": current_messages}
    

def should_format_response(state: AgentState) -> str:
    """
    Determines whether to format the response based on the 'structure' flag in the state.
    """
    # The initial request is the first message in the state
    if state["structure"] == 'structured':
        return "format_response"
    return "skip_formatting"