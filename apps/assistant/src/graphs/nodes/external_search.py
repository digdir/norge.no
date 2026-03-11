import logging
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.language_models.chat_models import BaseChatModel
from ...states.state import AgentState
from ...tools.sparql_tool import query_data_norge
from langchain_core.messages import AIMessage, HumanMessage
from ...tools.sparql_tool import query_data_norge

logger = logging.getLogger(__name__)

def search_external_node(state: AgentState, llm: BaseChatModel):
    """Node that calls the external search tool."""
    logger.info("Node: search_external_node")

    # Determine the real question (in case the last user input was just "yes" to a permission check)
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

    llm_with_tools = llm.bind_tools([query_data_norge])
    
    tool_calling_prompt = ChatPromptTemplate.from_messages([
        ("system", "You will generate a search query for the data.norge.no tool based on the user's question."),
        ("user", "Question: {question}")
    ])
    chain = tool_calling_prompt | llm_with_tools
    tool_call = chain.invoke({"question": real_question})
    
    if not tool_call.tool_calls:
        return {"messages": [AIMessage(content="I was unable to formulate a query for the external search.")]}
    
    external_query = tool_call.tool_calls[0]['args']['query']
    external_results = query_data_norge.invoke(external_query)
    
    final_answer_prompt = ChatPromptTemplate.from_messages([
        ("system", "Synthesize a final, comprehensive answer using the user's question, the local search results, and the external search results."),
        ("user", "Question: {question}\n\nLocal Results:\n{local_results}\n\nExternal Results:\n{external_results}")
    ])
    final_answer_chain = final_answer_prompt | llm
    final_answer = final_answer_chain.invoke({
        "question": real_question,
        "local_results": state.get('local_search_results', ''),
        "external_results": external_results
    })
    
    return {"messages": [final_answer]}