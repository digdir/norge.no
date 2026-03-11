from pydantic import BaseModel, Field
from typing import Literal

StructureType = Literal["unstructured", "structured"]

class ChatQueryRequest(BaseModel):
    question: str = Field(..., max_length=2000)
    structure: StructureType