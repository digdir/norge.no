import unittest.mock
from dotenv import load_dotenv
from src.tools.vector_store_tool import search_local_documents

load_dotenv()

def test_search_local_documents_returns_string():
    """
    Tests that the search_local_documents tool returns a string when documents are found.
    This test uses a "mock" to simulate the database, so it doesn't need a real DB to run.
    """
    class MockDoc:
        def __init__(self, content):
            self.page_content = content

    mock_retriever = unittest.mock.MagicMock()
    mock_retriever.invoke.return_value = [MockDoc("This is a test document.")]
    
    with unittest.mock.patch("src.tools.vector_store_tool.Chroma") as mock_chroma:
        mock_chroma.return_value.as_retriever.return_value = mock_retriever
        result = search_local_documents.invoke("any query")
        
        assert isinstance(result, str)
        assert "This is a test document." in result
