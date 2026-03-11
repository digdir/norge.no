from ...states.state import AgentState
import logging
from langchain.schema import AIMessage

logger = logging.getLogger(__name__)

def end_without_search_node(state: AgentState):
    """
    Node that generates a final message. This is used when the user declines an
    external search or when the agent determines no external search is needed.
    """
    logger.info("Node: end_without_search_node")
    
    last_message = state.get('messages', [])[-1]
    last_text = getattr(last_message, "content", last_message[1] if isinstance(last_message, tuple) else str(last_message)).lower()
    
    negative_words = ["no", "nei", "nei takk", "ellers takk", "n", "nope"]
    is_declining = any(last_text == word or last_text.startswith(word + " ") for word in negative_words)
    
    if is_declining:
        message_content = "Den er grei, jeg søker ikke i den eksterne databasen. Si fra hvis du lurer på noe annet!"
        return {"messages": [AIMessage(content=message_content)]}
    
    return {}