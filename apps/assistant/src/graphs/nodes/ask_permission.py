import logging
from ...states.state import AgentState
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import AIMessage
from typing import Literal

logger = logging.getLogger(__name__)

def decide_to_ask_permission_node(state: AgentState, llm: BaseChatModel):
    """
    Node that uses the LLM to decide if the local search results are sufficient
    or if it needs to ask for permission for an external search.
    """
    logger.info("Node: decide_to_ask_permission_node")
    logger.info(f"Input state keys: {list(state.keys())}")
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", 
         "You are an AI assistant for Norway's public services (data.norge.no). "
         "Evaluate if the 'Local Search Results' answer the user's question.\n\n"
         "RULE 1: If the results DO contain the answer, first generate a short, descriptive introductory sentence tailored to the exact text you found. This introductory sentence MUST be in the exact same language as the user's question (default to Norwegian Bokmål if the language cannot be determined). Separate this introductory sentence from the exact text snippet with a newline containing '---'. Then, return the EXACT relevant text snippet from the results immediately after the separator. Do not add any other conversational filler.\n\n"
         "RULE 2: If the results DO NOT contain the answer, you MUST ask for permission to search data.norge.no. "
         "You MUST ask this in the EXACT SAME LANGUAGE as the user's question.\n"
         "If the user asks in Norwegian, say ONLY: 'Jeg fant dessverre ikke nok informasjon om ditt spørsmål. '\n"
         "If the user asks in English, say ONLY: 'I couldn't find enough information locally. Should I search the external database data.norge.no?'\n"
         "Do not output anything else if you are asking for permission."),
        ("user", "Question: {question}\n\nLocal Search Results:\n{local_search_results}")
    ])

    chain = prompt | llm | StrOutputParser()

    response_text = chain.invoke({
        "question": state['question'],
        "local_search_results": state['local_search_results']
    })
    
    import json
    # Failsafe: if the LLM somehow returned a JSON string of a LangChain object, parse it
    try:
        parsed = json.loads(response_text)
        if "kwargs" in parsed and "message" in parsed["kwargs"]:
            response_text = parsed["kwargs"]["message"]["kwargs"]["content"]
        elif "kwargs" in parsed and "text" in parsed["kwargs"]:
            response_text = parsed["kwargs"]["text"]
    except Exception:
        pass # It's a standard string, just proceed
        
    final_message = AIMessage(content=response_text)
    
    logger.info(f"Returning message as permission check... ")
    
    # Check if the AI decided to ask for permission
    # Usually indicated by asking a question ?
    if "?" in response_text and "data.norge.no" in response_text.lower():
        logger.info("AI is asking for permission. Clearing citations as local search was insufficient.")
        return {"messages": [final_message], "citations": []}
    
    return {"messages": [final_message]}