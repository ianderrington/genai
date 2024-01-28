from operator import itemgetter

# from langchain.chat_models import ChatOpenAI
from langchain_openai import AzureChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.pydantic_v1 import BaseModel
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import ConfigurableField, RunnableParallel
import os

# from retrievers import (
#     hypothetic_question_vectorstore,
#     parent_vectorstore,
#     summary_vectorstore,
#     typical_rag,
# )

# Add typing for input
class Question(BaseModel):
    question: str


def initialize_chain(typical_rag, parent_vectorstore, hypothetic_question_vectorstore, summary_vectorstore):
    template = """Answer the question based only on the following context:
    {context}

    Question: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)

    model= AzureChatOpenAI(
        temperature=0,
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        openai_api_version=os.getenv("OPENAI_API_VERSION"),
        openai_api_base=os.getenv("OPENAI_API_BASE"),
        deployment_name="gpt-4",
    )
    retriever = typical_rag.as_retriever().configurable_alternatives(
        ConfigurableField(id="strategy"),
        default_key="typical_rag",
        parent_strategy=parent_vectorstore.as_retriever(),
        hypothetical_questions=hypothetic_question_vectorstore.as_retriever(),
        summary_strategy=summary_vectorstore.as_retriever(),
    )

    chain = (
        RunnableParallel(
            {
                "context": itemgetter("question") | retriever,
                "question": itemgetter("question"),
            }
        )
        | prompt
        | model
        | StrOutputParser()
    )

    chain = chain.with_types(input_type=Question)

    return chain

