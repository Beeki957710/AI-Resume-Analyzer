from resumeanalyzerrag.vectorstore import load_vectorstore
from resumeanalyzerrag.config import TOP_K

def get_retriever():
    vectorstore = load_vectorstore()

    retriever = vectorstore.as_retriever(
        search_kwargs={
            "k": TOP_K
        }
    )

    return retriever