import React from 'react';
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center mb-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 flex items-center justify-center gap-3">
        <FileText className="text-indigo-600 w-8 h-8" /> ATS Resume Analyzer
      </h1>
      <p className="text-slate-500 mt-2">Local RAG powered by LangChain, Ollama & Llama 3.2</p>
    </header>
  );
}