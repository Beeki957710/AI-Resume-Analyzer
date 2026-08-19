from langchain_chroma import Chroma
from resumeanalyzerrag.config import CHROMA_PATH
from resumeanalyzerrag.embeddings import get_embeddings

def create_vectorstore(chunks):
    embeddings = get_embeddings()
    
    # 1. Connect to existing store
    vectorstore = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings
    )
    
    # 2. Reset database contents to purge previous resume embeddings
    vectorstore.reset_collection()

    # 3. Add current document chunks
    vectorstore.add_documents(documents=chunks)

    return vectorstore


def load_vectorstore():
    embeddings = get_embeddings()

    vectorstore = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings
    )

    return vectorstore
