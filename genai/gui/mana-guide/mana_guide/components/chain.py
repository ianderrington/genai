# FROM https://github.com/langchain-ai/chat-langchain/tree/master

import os
from operator import itemgetter
from typing import Dict, List, Optional, Sequence

# import weaviate
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

from langchain_community.chat_models.anthropic import ChatAnthropic
from langchain_community.chat_models.fireworks import ChatFireworks
from langchain_community.embeddings.voyageai import VoyageEmbeddings

# from langchain_community.vectorstores.weaviate import Weaviate

from qdrant_client import QdrantClient
from langchain_community.vectorstores import Qdrant

from langchain_core.documents import Document
# from langchain_core.embeddings import Embeddings
from langchain_core.language_models.base import BaseLanguageModel
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (ChatPromptTemplate, MessagesPlaceholder,
                                    PromptTemplate)
from langchain_core.retrievers import BaseRetriever
from langchain_core.runnables import (ConfigurableField, Runnable,
                                      RunnableBranch, RunnableLambda,
                                      RunnableMap)

# from langchain_google_genai import ChatGoogleGenerativeAI

# from langchain_openai import ChatOpenAI, OpenAIEmbeddings

# from langsmith import Client
from pydantic import BaseModel

# from .constants import WEAVIATE_DOCS_INDEX_NAME

import os
import dotenv
dotenv.load_dotenv()

RESPONSE_TEMPLATE = """\
You are an expert programmer and problem-solver, tasked with answering any question \
about Generative AI.

Generate a comprehensive and informative answer of 80 words or less for the \
given question based solely on the provided search results (URL and content). You must \
only use information from the provided search results. Use an unbiased and \
journalistic tone. Combine search results together into a coherent answer. Do not \
repeat text. Cite search results using [${{number}}] notation. Only cite the most \
relevant results that answer the question accurately. Place these citations at the end \
of the sentence or paragraph that reference them - do not put them all at the end. If \
different results refer to different entities within the same name, write separate \
answers for each entity.

You should use bullet points in your answer for readability. Put citations where they apply
rather than putting them all at the end.

If there is nothing in the context relevant to the question at hand, just say "Hmm, \
I'm not sure." Don't try to make up an answer.

Anything between the following `context`  html blocks is retrieved from a knowledge \
bank, not part of the conversation with the user. 

<context>
    {context} 
<context/>

REMEMBER: If there is no relevant information within the context, just say "Hmm, I'm \
not sure." Don't try to make up an answer. Anything between the preceding 'context' \
html blocks is retrieved from a knowledge bank, not part of the conversation with the \
user.\
"""

REPHRASE_TEMPLATE = """\
Given the following conversation and a follow up question, rephrase the follow up \
question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone Question:"""


# client = Client()

# app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
#     expose_headers=["*"],
# )

# WEAVIATE_URL = os.environ["WEAVIATE_URL"]
# WEAVIATE_API_KEY = os.environ["WEAVIATE_API_KEY"]

# RECORD_MANAGER_DB_URL = os.environ["RECORD_MANAGER_DB_URL"]

# print(f"hiya WEAVIATE_URL = {WEAVIATE_URL}")
# print(f"WEAVIATE_API_KEY = {WEAVIATE_API_KEY}")
# print(f"RECORD_MANAGER_DB_URL = {RECORD_MANAGER_DB_URL}")


class ChatRequest(BaseModel):
    question: str
    chat_history: Optional[List[Dict[str, str]]]


def get_retriever_weaviate(embedding_model, weaviate_url, weaviate_docs_index_name, api_key, ) -> BaseRetriever:
    # weaviate_client = weaviate.Client(
    #     url=weaviate_url,
    #     auth_client_secret=weaviate.AuthApiKey(api_key=api_key),
    # )
    weaviate_client = Weaviate(
        client=weaviate_client,
        index_name=weaviate_docs_index_name,
        text_key="text",
        embedding=embedding_model,
        by_text=False,
        attributes=["source", "title"],
    )
    return weaviate_client.as_retriever(search_kwargs=dict(k=6))


def get_retriever_qdrant(embedding_model, url, collection_name) -> BaseRetriever:

    client = QdrantClient(url)
    qdrant = Qdrant(client, collection_name, embedding_model)
    
    retriever = qdrant.as_retriever(search_type="mmr")
    return retriever


def get_retriever(retriever_name, embedding_model, **kwargs) -> BaseRetriever:
    if retriever_name == "weaviate":
        return get_retriever_weaviate(embedding_model, **kwargs)
    elif retriever_name == "qdrant":
        return get_retriever_qdrant(embedding_model, **kwargs)
    else:
        raise ValueError(f"Unknown retriever: {retriever_name}")


def create_retriever_chain(
    llm: BaseLanguageModel, retriever: BaseRetriever
) -> Runnable:
    # Create a chain that rephrases the question into a stand alone question. 
    CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(REPHRASE_TEMPLATE)
    condense_question_chain = (
        CONDENSE_QUESTION_PROMPT | llm | StrOutputParser()
    ).with_config(
        run_name="CondenseQuestion",
    )
    conversation_chain = condense_question_chain | retriever
    return RunnableBranch(
        (
            RunnableLambda(lambda x: bool(x.get("chat_history"))).with_config(
                run_name="HasChatHistoryCheck"
            ),
            conversation_chain.with_config(run_name="RetrievalChainWithHistory"),
        ),
        (
            RunnableLambda(itemgetter("question")).with_config(
                run_name="Itemgetter:question"
            )
            | retriever
        ).with_config(run_name="RetrievalChainWithNoHistory"),
    ).with_config(run_name="RouteDependingOnChatHistory")


def format_docs(docs: Sequence[Document]) -> str:
    formatted_docs = []
    for i, doc in enumerate(docs):
        doc_string = f"<doc id='{i}'>{doc.page_content}</doc>"
        formatted_docs.append(doc_string)
    return "\n".join(formatted_docs)


def serialize_history(request: ChatRequest):
    chat_history = request["chat_history"] or []
    converted_chat_history = []
    for message in chat_history:
        if message.get("human") is not None:
            converted_chat_history.append(HumanMessage(content=message["human"]))
        if message.get("ai") is not None:
            converted_chat_history.append(AIMessage(content=message["ai"]))
    return converted_chat_history


def create_chain(
    llm: BaseLanguageModel,
    retriever: BaseRetriever,
) -> Runnable:
    retriever_chain = create_retriever_chain(
        llm,
        retriever,
    ).with_config(run_name="FindDocs")
    _context = RunnableMap(
        {
            "context": retriever_chain | format_docs,
            "question": itemgetter("question"),
            "chat_history": itemgetter("chat_history"),
        }
    ).with_config(run_name="RetrieveDocs")
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", RESPONSE_TEMPLATE),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{question}"),
        ]
    )

    response_synthesizer = (prompt | llm | StrOutputParser()).with_config(
        run_name="GenerateResponse",
    )
    return (
        {
            "question": RunnableLambda(itemgetter("question")).with_config(
                run_name="Itemgetter:question"
            ),
            "chat_history": RunnableLambda(serialize_history).with_config(
                run_name="SerializeHistory"
            ),
        }
        | _context
        | response_synthesizer
    )


def answer_chain(llm, retriever):
 return create_chain(
    llm,
    retriever,
)
