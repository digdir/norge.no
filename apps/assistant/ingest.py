import os, json, logging
import chromadb

from dotenv import load_dotenv
from bs4 import BeautifulSoup
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from src.dependencies.embeddings import get_embeddings

logger = logging.getLogger(__name__)
PERSIST_DIRECTORY = "db"

def sanitize_metadata(metadata: dict) -> dict:
    sanitized = {}
    for key, value in metadata.items():
        if isinstance(value, list):
            sanitized[key] = ", ".join(map(str, value))
        elif value is not None:
            sanitized[key] = value
    return sanitized

def process_detailed_article(article: dict) -> list[Document]:
    documents = []
    article_data = article.get("data", {})
    article_id = article.get("_id")
    
    child_atoms_list = [
        {"atom_id": atom.get("_id"), "atom_title": atom.get("data", {}).get("title")}
        for atom in article.get("atoms", []) if atom.get("_id")
    ]
    
    child_atoms_str = json.dumps(child_atoms_list)

    parent_page_content = f"Title: {article_data.get('title', '')}. Content: {article_data.get('ingress', '')}"
    parent_metadata = {
        "article_id": article_id,
        "article_path": article.get("_path"),
        "article_title": article_data.get("title"),
        "language": article.get("language"),
        "document_type": "summary",
        "child_atoms": child_atoms_str
    }
    documents.append(Document(page_content=parent_page_content, metadata=sanitize_metadata(parent_metadata)))
    
    for atom in article.get("atoms", []):
        atom_data = atom.get("data", {})
        html_content = atom_data.get("text", {}).get("processedHtml", "")
        cleaned_text = BeautifulSoup(html_content, 'html.parser').get_text(separator=" ", strip=True)
        atom_title = atom_data.get("title", "")
        page_content = f"Title: {atom_title}. Content: {cleaned_text}"
        
        metadata = {
            "parent_id": article_id,
            "parent_path": article.get("_path"),
            "parent_title": article_data.get("title"),
            "language": article.get("language"),
            "document_type": "atom",
            "atom_id": atom.get("_id"),
            "atom_title": atom_title,
            "atom_unitType": atom_data.get("unitType"),
            "atom_noOfEmployees": atom_data.get("noOfEmployees"),
        }
        
        doc = Document(page_content=page_content, metadata=sanitize_metadata(metadata))
        documents.append(doc)
    return documents

def process_article_summary(summary: dict) -> Document:
    data = summary.get("data", {})
    page_content = f"Title: {data.get('title', '')}. Content: {data.get('ingress', '')}"
    
    content_owner_list = data.get("contentOwner", [])
    owner_name = content_owner_list[0].get("displayName") if content_owner_list else None

    metadata = {
        "article_id": summary.get("_id"),
        "article_path": summary.get("_path"),
        "article_title": data.get("title"),
        "language": summary.get("language"),
        "document_type": "summary",
        "contentOwner": owner_name,
        "unitType": data.get("unitType"),
        "noOfEmployees": data.get("noOfEmployees")
    }
    
    return Document(page_content=page_content, metadata=sanitize_metadata(metadata))

def ingest_all_data():
    # Load from Docker secret if it exists (build time)
    if os.path.exists("/run/secrets/assistant_env"):
        load_dotenv("/run/secrets/assistant_env")
    else:
        # Fall back to local .env file
        load_dotenv()
        
    use_ollama = os.getenv("USE_OLLAMA", "false").lower() == "true"
    use_azure = os.getenv("USE_AZURE_OPENAI", "false").lower() == "true"

    if not use_ollama and not use_azure:
        if not os.getenv("GOOGLE_API_KEY"):
            raise ValueError("GOOGLE_API_KEY not found. Set it in .env for local use or via Docker secrets for builds.")
    if use_azure:
        if not os.getenv("AZURE_OPENAI_API_KEY"):
            raise ValueError("AZURE_OPENAI_API_KEY not found for Azure setup.")
    
    json_directory = "data/"
    langchain_documents = []
    
    logger.info(f"-> Loading all JSON files from '{json_directory}'...")
    for filename in os.listdir(json_directory):
        if filename.endswith(".json"):
            file_path = os.path.join(json_directory, filename)
            with open(file_path, 'r') as f:
                data = json.load(f)
                
                if isinstance(data, list):
                    for summary in data:
                        langchain_documents.append(process_article_summary(summary))
                elif isinstance(data, dict) and "atoms" in data:
                    langchain_documents.extend(process_detailed_article(data))
                else:
                    logger.info(f"  - Skipping {filename}: Unrecognized JSON structure.")

    if not langchain_documents:
        logger.info("No documents were created. Check your JSON files and structure.")
        return

    logger.info(f"-> Created {len(langchain_documents)} documents from all files.")
    logger.info("-> Creating and saving embeddings...")
    embeddings = get_embeddings()

    settings = chromadb.Settings(
        anonymized_telemetry=False,
        is_persistent=True,
        persist_directory="./db"
    )

    from langchain.text_splitter import RecursiveCharacterTextSplitter
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    split_docs = text_splitter.split_documents(langchain_documents)
    
    logger.info(f"-> Split into {len(split_docs)} chunks. Saving to Chroma...")

    Chroma.from_documents(
        documents=split_docs, 
        embedding=embeddings, 
        persist_directory=PERSIST_DIRECTORY,
        client_settings=settings
    )
    logger.info("\n--- Ingestion Complete ---")
    logger.info(f"Vector store has been updated and saved to the '{PERSIST_DIRECTORY}/' directory.")

if __name__ == "__main__":
    ingest_all_data()