import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.output_parsers import PydanticOutputParser
from resumeanalyzerrag.schema import ATSAnalysisResult

load_dotenv()

def get_llm():
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable is missing.")

    # Use a supported, highly capable Groq text model
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=api_key,
        temperature=0.2
    )
    return llm

def get_structured_llm():
    s_llm = get_llm()
    # Explicitly bind the Pydantic parser method for reliability on Groq
    return s_llm.with_structured_output(ATSAnalysisResult, method="json_mode")