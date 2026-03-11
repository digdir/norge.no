import uvicorn, logging, os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from langchain_core.globals import set_llm_cache
from langchain_community.cache import SQLiteCache
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from .dependencies.rate_limiter import limiter
from .apis import api_router

load_dotenv()
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Set up local LLM Caching to save test costs/API calls
set_llm_cache(SQLiteCache(database_path=".langchain.db"))

app = FastAPI(
    title="Assistant Server",
    description="An API server for interacting with a chat agent.",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

print('Fronted host:', os.getenv('FRONTEND_HOST'))

origins = [
    os.getenv('FRONTEND_HOST')
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/", tags=["Health Check"])
async def root():
    """
    Root endpoint for health checks.
    """
    return {"status": "ok"}

if __name__ == "__main__":
    host = os.getenv("APP_HOST", "127.0.0.1")
    port = int(os.getenv("APP_PORT", 8000))
    uvicorn.run("src.main:app", host=host, port=port, reload=True)