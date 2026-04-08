import os
from langchain_core.language_models.chat_models import BaseChatModel

def get_llm(temperature: float = 0) -> BaseChatModel:
    if os.getenv("USE_OLLAMA") == "true":
        from langchain_ollama import ChatOllama
        return ChatOllama(model=os.getenv("OLLAMA_MODEL", "mistral-nemo"), temperature=temperature)
    else:
        from langchain_openai import AzureChatOpenAI
        return AzureChatOpenAI(
            azure_deployment=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o"),
            openai_api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-01"),
            temperature=temperature
        )
