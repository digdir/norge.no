import logging
from fastapi.testclient import TestClient
from src.main import app

logger = logging.getLogger(__name__)
client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
