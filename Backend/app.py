from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from resumeanalyzerrag.schema import ATSAnalysisResult
from resumeanalyzerrag.loader import load_resume
from resumeanalyzerrag.splitter import split_documents
from resumeanalyzerrag.vectorstore import create_vectorstore
from resumeanalyzerrag.rag_pipeline import analyze_resume
import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Allow Vite frontend default ports & wildcard for local dev
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze", response_model=ATSAnalysisResult)
async def analyze(file: UploadFile = File(...), job_description: str = Form(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDFs supported.")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        documents = load_resume(tmp_path)
        chunks = split_documents(documents)
        create_vectorstore(chunks)
        
        result = analyze_resume(job_description)
        return result["answer"]
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)