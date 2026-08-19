from resumeanalyzerrag.rag_pipeline import analyze_resume


def main():

    question = input("Ask a question: ")

    result = analyze_resume(question)

    print("\n================ ANSWER ================\n")

    print(result["answer"])

    print("\n================ SOURCES ================\n")

    for document in result["sources"]:

        print(
            f"Page: {document.metadata.get('page', 'Unknown')}"
        )


if __name__ == "__main__":
    main()