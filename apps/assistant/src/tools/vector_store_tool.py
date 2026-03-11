import logging

from langchain_chroma import Chroma
from ..dependencies.embeddings import get_embeddings
from langchain_core.tools import tool


logger = logging.getLogger(__name__)

PERSIST_DIRECTORY = "db"

@tool
def search_local_documents(query: str) -> str:
    """
    Searches and retrieves information from our local, private documents.
    Use this for questions about internal projects, teams, and proprietary 
    information like the status of 'John Doe'.
    """

    logger.info(f"\n--- Searching local documents for: '{query}' ---\n")

    embeddings = get_embeddings()
    db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
    retriever = db.as_retriever(search_kwargs={"k": 3})
    docs = retriever.invoke(query)
    
    if not docs:
        return "No relevant information found in local documents."
    return "\n\n".join([doc.page_content for doc in docs])
