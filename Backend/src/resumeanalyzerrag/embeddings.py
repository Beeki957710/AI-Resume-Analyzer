from langchain_ollama import OllamaEmbeddings
from resumeanalyzerrag.config import EMBEDDING_MODEL

def get_embeddings():
    embeddings = OllamaEmbeddings(
        model=EMBEDDING_MODEL
    )

    return embeddings