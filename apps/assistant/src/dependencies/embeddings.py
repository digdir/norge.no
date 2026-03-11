import os
from langchain_core.embeddings import Embeddings

def get_embeddings() -> Embeddings:
    if os.getenv("USE_OLLAMA") == "true":
        from langchain_community.embeddings import OllamaEmbeddings
        return OllamaEmbeddings(model=os.getenv("OLLAMA_EMBEDDING_MODEL", "mxbai-embed-large"))
    elif os.getenv("USE_AZURE_OPENAI") == "true":
        from langchain_openai import AzureOpenAIEmbeddings
        return AzureOpenAIEmbeddings(
            azure_deployment=os.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME", "text-embedding-3-large"),
            openai_api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-01"),
        )
    else:
        from langchain_google_genai import GoogleGenerativeAIEmbeddings
        return GoogleGenerativeAIEmbeddings(model=os.getenv("GOOGLE_GEMINI_EMBEDDING_MODEL", "models/embedding-001"))
