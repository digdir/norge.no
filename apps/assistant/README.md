# Assistant API

This is the backend service for the AI Assistant built with FastAPI, LangGraph, and LangChain.

## Prerequisites
- Python 3.13+
- [Poetry](https://python-poetry.org/docs/#installation) for dependency management
- Optional: Local Ollama instance if configured to run local models

## Local Development Setup

1. Move into the directory:
   ```bash
   cd apps/assistant
   ```

2. Install dependencies:
   ```bash
   poetry install
   ```

3. Environment Variables:
   Copy the example environment variables and add your Google API key or local configs:
   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   poetry run fastapi dev src/main.py
   # OR from root:
   # deno task assistant:dev
   ```

## Testing
To run unit tests locally:
```bash
poetry run pytest tests/
```
