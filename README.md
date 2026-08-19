# 🚀 ATS Resume Engine (RAG-Powered)

An AI-driven Applicant Tracking System (ATS) optimization and resume evaluation tool. Built with **FastAPI**, **LangChain**, **Chroma DB**, **Ollama (Llama 3.2)**, and a **React + Tailwind CSS** frontend.

It performs semantic retrieval on candidate PDF resumes using local RAG (Retrieval-Augmented Generation) to score match compatibility against job descriptions without sending personal data to external cloud APIs.

---

## ✨ Features

- **⚡ Local RAG Pipeline:** Secure document parsing and vector retrieval using Chroma DB and Ollama.
- **📊 ATS Compatibility Scoring:** Evaluates matching capabilities, missing skills, and overall candidate fit ($0–100\%$).
- **🎨 Modern Glassmorphism Dashboard:** Responsive React UI featuring multi-stage animation loaders and interactive match indicators.
- **🔒 Privacy-First:** Runs entirely on local LLMs and embeddings.

---

## 🛠️ Tech Stack

### **Backend**
* **Framework:** FastAPI
* **LLM & Embeddings:** Ollama (Llama 3.2)
* **Orchestration:** LangChain
* **Vector Store:** Chroma DB
* **PDF Parser:** PyPDF

### **Frontend**
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **HTTP Client:** Axios

---

## 📂 Project Structure

```text
├── Backend/
│   ├── app.py                      # FastAPI entry point & API endpoints
│   ├── chroma_db/                  # Local vector database storage
│   └── src/
│       └── resumeanalyzerrag/      # RAG pipeline, prompts, & embeddings
├── Frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main React Dashboard UI
│   │   └── index.css               # Tailwind & custom CSS animations
│   └── package.json
└── README.md
