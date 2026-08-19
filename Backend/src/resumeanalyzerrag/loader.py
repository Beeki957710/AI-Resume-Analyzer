from langchain_community.document_loaders import PyPDFLoader
from pathlib import Path

def load_resume(pdf_path: str):
    path = Path(pdf_path)

    if not path.exists():

        raise FileNotFoundError(
            f"Resume not found: {pdf_path}"
        )
    
    loader = PyPDFLoader(str(path))
    documents = loader.load()

    return documents



