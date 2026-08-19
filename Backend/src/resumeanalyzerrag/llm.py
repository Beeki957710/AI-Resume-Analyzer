import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.output_parsers import PydanticOutputParser
from resumeanalyzerrag.schema import ATSAnalysisResult

load_dotenv()

def get_llm():
    raw_key = os.environ.get("GROQ_API_KEY", "")
    groq_api_key = raw_key.strip()

    if not groq_api_key:
        raise ValueError("GROQ_API_KEY environment variable is missing.")

    llm = ChatGroq(
        groq_api_key=groq_api_key,
        model_name="openai/gpt-oss-120b",  # Exact string without spaces
        temperature=0.2
    )

    return llm

def get_structured_llm():
    s_llm = get_llm()
    # Explicitly bind the Pydantic parser method for reliability on Groq
    return s_llm.with_structured_output(ATSAnalysisResult, method="json_mode")




