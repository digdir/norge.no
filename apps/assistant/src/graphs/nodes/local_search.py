import logging
from ...states.state import AgentState
from ...dependencies.embeddings import get_embeddings
from langchain_chroma import Chroma


logger = logging.getLogger(__name__)

PERSIST_DIRECTORY = "db"

def search_local_node(state: AgentState):
    """Node that performs the initial search in the local vector database."""
    logger.info("Node: search_local_node")
    question = state['question']
    
    embeddings = get_embeddings()
    db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
    retriever = db.as_retriever(search_kwargs={"k": 3})
    docs = retriever.invoke(question)
    
    if not docs:
        results = "No relevant information found in local documents."
        citations = []
    else:
        results = "\n\n".join([doc.page_content for doc in docs])
        citations = []
        seen = set()
        for doc in docs:
            meta = doc.metadata
            title = meta.get("atom_title") or meta.get("article_title") or "Ukjent dokument"
            path = meta.get("parent_path") or meta.get("article_path") or ""
            doc_type = meta.get("document_type") or "unknown"
            
            identifier = f"{title}-{path}"
            if identifier not in seen:
                seen.add(identifier)
                citations.append({
                    "title": title,
                    "path": path,
                    "type": doc_type
                })
            
    return {
        "local_search_results": results,
        "citations": citations,
    }