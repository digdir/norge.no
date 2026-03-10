from pydantic import BaseModel
from typing import Literal

StructureType = Literal["unstructured", "structured"]

class ChatQueryRequest(BaseModel):
    question: str
    structure: StructureType