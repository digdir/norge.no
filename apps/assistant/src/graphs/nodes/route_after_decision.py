from ...states.state import AgentState
import logging
from typing import Literal

logger = logging.getLogger(__name__)

def route_after_decision_node(state: AgentState) -> Literal["end_conversation", "wait_for_user_reply"]:
    """
    Router that checks the AI's last message. If it contains a question mark,
    it means we need to wait for the user. Otherwise, we format the response.
    """
    logger.info("Node: route_after_decision_node")
    logger.info(f"Current state keys: {list(state.keys())}")
    
    if 'messages' in state and state['messages']:
        last_msg = state['messages'][-1]
        last_ai_message = getattr(last_msg, "content", last_msg[1] if isinstance(last_msg, tuple) else str(last_msg))
        logger.info(f"Last AI message: {last_ai_message}")
    else:
        logger.error("No messages found in state")
        logger.error(f"Available state: {state}")
        return "end_conversation"
    
    if "?" in last_ai_message:
        logger.info("Decision: AI is asking a question. Waiting for user reply.")
        return "wait_for_user_reply"
    else:
        logger.info("Decision: AI found local info. End conversation/Route.")
        return "end_conversation"