import requests
resp = requests.post('http://localhost:8000/api/chat-query/', json={"question": "hei", "structure": "structured", "session_id": "test"})
print(resp.text)
