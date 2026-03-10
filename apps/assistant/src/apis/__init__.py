from fastapi import APIRouter
from .routers.query import router as query_router

api_router = APIRouter(prefix="/api")
api_router.include_router(query_router)
