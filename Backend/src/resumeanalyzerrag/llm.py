from langchain_ollama import ChatOllama
from resumeanalyzerrag.config import LLM_MODEL
from schema import ATSAnalysisResult

def get_llm():
    llm = ChatOllama(
        model=LLM_MODEL,
        temperature=0
    )

    return llm

def get_structured_llm():
    s_llm = get_llm()
    structured_llm = s_llm.with_structured_output(ATSAnalysisResult)

    return structured_llm
