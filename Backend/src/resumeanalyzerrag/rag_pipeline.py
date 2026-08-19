from langchain_core.prompts import ChatPromptTemplate

from resumeanalyzerrag.retriever import get_retriever
from resumeanalyzerrag.llm import get_llm, get_structured_llm
from resumeanalyzerrag.prompts import RESUME_ANALYZER_PROMPT


def format_documents(documents):

    return "\n\n".join(
        document.page_content
        for document in documents
    )

def analyze_resume(job_description: str):
    retriever = get_retriever()


    documents = retriever.invoke(job_description)

    context = format_documents(documents)

    prompt = ChatPromptTemplate.from_template(
        RESUME_ANALYZER_PROMPT
    )

   

    structured_llm = get_structured_llm()

    chain = prompt | structured_llm

    response = chain.invoke({
        "context": context,
        "question": job_description
    })

    return {
     "answer": response,
     "source": documents
    }