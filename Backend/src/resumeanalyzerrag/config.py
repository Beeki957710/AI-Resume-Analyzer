import os

PDF_PATH = os.path.join("data", "resume.pdf")

LLM_MODEL = "llama3.2:latest"

EMBEDDING_MODEL = "nomic-embed-text:latest"

CHROMA_PATH = "./chroma_db"

CHUNK_SIZE = 800

CHUNK_OVERLAP = 150

TOP_K = 5