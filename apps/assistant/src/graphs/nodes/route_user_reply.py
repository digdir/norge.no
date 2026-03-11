from typing import Literal
import logging
from ...states.state import AgentState
from langchain_core.messages import AIMessage

logger = logging.getLogger(__name__)

def route_user_reply_node(state: AgentState) -> Literal["search_external", "end_without_search", "search_local"]:
    """
    Router that checks the user's last message to see if they granted permission.
    """
    logger.info("Node: route_user_reply_node")

    if not state.get('messages'):
        logger.error("No messages found in state")
        return "end_without_search"
    
    last_message = state['messages'][-1]
    
    # Safely get type and content depending on whether it's a tuple or a Message object
    if isinstance(last_message, tuple):
        msg_type, msg_content = last_message[0], last_message[1]
    else:
        msg_type = getattr(last_message, "type", "unknown")
        msg_content = getattr(last_message, "content", str(last_message))
    
    # If the last message is from the AI, we are still waiting for the user to respond.
    # Return 'end_without_search' to pause execution and prompt the user.
    if msg_type == "ai" or isinstance(last_message, AIMessage):
        logger.info("Last message is from AI. Stopping graph to await actual user reply.")
        return "end_without_search"

    last_user_message = str(msg_content).lower().strip()
    
    affirmative_words = ["yes", "ja", "ok", "y", "sure", "gjerne", "ja takk", "jepp"]
    
    if any(last_user_message == word or last_user_message.startswith(word + " ") for word in affirmative_words):
        logger.info("Decision: User approved external search.")
        return "search_external"
    
    negative_words = ["no", "nei", "nei takk", "ellers takk", "n", "nope"]
    if any(last_user_message == word or last_user_message.startswith(word + " ") for word in negative_words):
        logger.info("Decision: User denied external search.")
        return "end_without_search"
        
    logger.info("Decision: User asked a completely new question while waiting for permission. Routing to local search.")
    return "search_local"