import os
from langchain_core.embeddings import Embeddings

def get_embeddings() -> Embeddings:
    if os.getenv("USE_OLLAMA") == "true":
        from langchain_community.embeddings import OllamaEmbeddings
        return OllamaEmbeddings(model=os.getenv("OLLAMA_EMBEDDING_MODEL", "mxbai-embed-large"))
    else:
        from langchain_google_genai import GoogleGenerativeAIEmbeddings
        return GoogleGenerativeAIEmbeddings(model=os.getenv("GOOGLE_GEMINI_EMBEDDING_MODEL", "models/embedding-001"))
