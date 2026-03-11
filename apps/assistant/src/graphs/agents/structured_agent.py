import logging
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from functools import partial
from ...dependencies.llm import get_llm
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from ...states.state import AgentState
from ..nodes.local_search import search_local_node
from ..nodes.ask_permission import decide_to_ask_permission_node
from ..nodes.external_search import search_external_node
from ..nodes.end_without_search import end_without_search_node
from ..nodes.route_after_decision import route_after_decision_node
from ..nodes.route_user_reply import route_user_reply_node
from ..nodes.format_response import format_response_node
from ...schemas.semantic_data import SemanticResponse

load_dotenv()
logger = logging.getLogger(__name__)

class ExternalSearchTool(BaseModel):
    """Use this tool to query the external data.norge.no database."""
    query: str = Field(description="The search query to use for data.norge.no")

def create_structured_agent_executor():
    """Creates and returns the graph-based agent executor."""

    llm = get_llm(temperature=0)
    llm_with_tools = llm.bind_tools([ExternalSearchTool])
    formatter_llm = get_llm(temperature=0).with_structured_output(SemanticResponse)
    
    bound_decide_node = partial(decide_to_ask_permission_node, llm=llm)
    bound_external_search_node = partial(search_external_node, llm=llm)
    bound_formatter_node = partial(format_response_node, llm=formatter_llm)
    
    workflow = StateGraph(AgentState)
    workflow.add_node("search_local", search_local_node)
    workflow.add_node("decide_to_ask", bound_decide_node)
    workflow.add_node("search_external", bound_external_search_node)
    workflow.add_node("end_without_search", end_without_search_node)
    workflow.add_node("wait_for_user_reply", lambda state: state)
    workflow.add_node("format_response", bound_formatter_node)
    
    workflow.set_entry_point("search_local")
    workflow.add_edge("search_local", "decide_to_ask")
    workflow.add_conditional_edges(
        "decide_to_ask",
        route_after_decision_node,
        {
            "wait_for_user_reply": "wait_for_user_reply",
            "end_conversation": "format_response",
        },
    )
    workflow.add_conditional_edges(
        "wait_for_user_reply",
        route_user_reply_node,
        {
            "search_external": "search_external",
            "end_without_search": "end_without_search",
            "search_local": "search_local",
        },
    )
    workflow.add_edge("search_external", "format_response")
    workflow.add_edge("end_without_search", "format_response")
    workflow.add_edge("format_response", END)

    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory, interrupt_before=["wait_for_user_reply"])

    logger.info("Graph-based agent executor created successfully.")
    return app
