FROM python:3.13-slim AS builder

RUN apt-get update && apt-get install -y build-essential

WORKDIR /app

RUN pip install poetry
RUN poetry config virtualenvs.in-project true

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-root

COPY src ./src
COPY data ./data
COPY ingest.py .

FROM python:3.13-slim AS final

WORKDIR /app

RUN addgroup --system app && adduser --system --group app

COPY --from=builder /app/.venv ./.venv
COPY src ./src
COPY data ./data
COPY ingest.py .
# db directory will be created at runtime by ingest.py
RUN mkdir -p /app/db && chown -R app:app /app

ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app"

USER app

EXPOSE 8000

CMD ["sh", "-c", "python ingest.py && uvicorn src.main:app --host 0.0.0.0 --port 8000"]