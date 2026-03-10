import os
from langchain_core.language_models.chat_models import BaseChatModel

def get_llm(temperature: float = 0) -> BaseChatModel:
    if os.getenv("USE_OLLAMA") == "true":
        from langchain_ollama import ChatOllama
        return ChatOllama(model=os.getenv("OLLAMA_MODEL", "mistral-nemo"), temperature=temperature)
    else:
        from langchain_google_genai import ChatGoogleGenerativeAI
        return ChatGoogleGenerativeAI(model=os.getenv("GOOGLE_GEMINI_MODEL", "gemini-2.5-flash"), temperature=temperature)
