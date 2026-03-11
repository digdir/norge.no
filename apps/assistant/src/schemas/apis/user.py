import uuid
from fastapi import Header
from typing import Optional

def get_session_id(x_session_id: Optional[str] = Header(None)) -> str:
    """
    Get or generate a session ID for the user.
    If no session ID is provided in headers, generate a new one.
    """
    if x_session_id:
        return x_session_id
    return str(uuid.uuid4())