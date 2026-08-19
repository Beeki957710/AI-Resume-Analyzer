from resumeanalyzerrag.loader import load_resume
from resumeanalyzerrag.splitter import split_documents
from resumeanalyzerrag.vectorstore import create_vectorstore
from resumeanalyzerrag.config import PDF_PATH




def main():

    print("Loading resume...")
    documents = load_resume(PDF_PATH)

    print(f"Loaded {len(documents)} pages.")

    print("Splitting resume...")
    chunks = split_documents(documents)

    print(f"Created {len(chunks)} chunks.")

    print("Creating vector database...")
    create_vectorstore(chunks)

    print("Vector database created successfully.")


if __name__ == "__main__":
    main()