from langchain_huggingface import HuggingFaceEmbeddings
from resumeanalyzerrag.config import EMBEDDING_MODEL

def get_embeddings():
    embeddings = HuggingFaceEmbeddings(
        model=EMBEDDING_MODEL
    )

    return embeddings



