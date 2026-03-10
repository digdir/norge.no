import operator
from typing import TypedDict, List, Optional, Any, Annotated
from langchain_core.messages import BaseMessage
from ..schemas.apis.query import StructureType


def add_messages(left: list, right: list):
    left_list = left if isinstance(left, list) else ([left] if left is not None else [])
    right_list = right if isinstance(right, list) else ([right] if right is not None else [])
    return left_list + right_list

class AgentState(TypedDict):
    question: str
    structure: StructureType
    local_search_results: Optional[str]
    messages: Annotated[list, add_messages]
    user_reply: Optional[str]
    citations: Optional[List[Any]]
