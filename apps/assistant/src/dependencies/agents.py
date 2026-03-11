from functools import lru_cache
from ..graphs.agents.unstructured_agent import create_unstructured_agent_executor
from ..graphs.agents.structured_agent import create_structured_agent_executor

@lru_cache
def get_unstructured_agent_executor():
    """
    Dependency function that creates and returns a single instance
    of the unstructured agent executor.
    """
    return create_unstructured_agent_executor()

@lru_cache
def get_structured_agent_executor():
    """
    Dependency function that creates and returns a single instance
    of the structured agent executor.
    """
    return create_structured_agent_executor()