import json
from langchain_core.tools import tool
from SPARQLWrapper import SPARQLWrapper, JSON

@tool
def query_data_norge(sparql_query: str) -> str:
    """
    Executes a SPARQL query against the data.norge.no endpoint. 
    Use this to find public, official data about Norway, such as organizations, 
    datasets, municipalities, counties, etc. The query must be a valid SPARQL 
    query string.
    """
    endpoint_url = "https://data.norge.no/sparql"
    sparql = SPARQLWrapper(endpoint_url)
    sparql.setQuery(sparql_query)
    sparql.setReturnFormat(JSON)
    
    try:
        results = sparql.query().convert()
        return json.dumps(results, indent=2)
    except Exception as e:
        return f"An error occurred while executing the SPARQL query: {str(e)}"