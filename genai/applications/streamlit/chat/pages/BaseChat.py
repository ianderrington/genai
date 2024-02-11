import os
from operator import itemgetter
from typing import Dict, List, Optional, Sequence
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

import streamlit as st
import weaviate
from constants import WEAVIATE_DOCS_INDEX_NAME
# from langsmith import Client
from langchain.agents import AgentType, initialize_agent
from langchain.chains import ChatVectorDBChain
from langchain.vectorstores.weaviate import Weaviate
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain_community.chat_models import ChatOpenAI
from langchain_community.chat_models.anthropic import ChatAnthropic
from langchain_community.chat_models.fireworks import ChatFireworks
from langchain_community.embeddings.voyageai import VoyageEmbeddings
from langchain_community.llms import OpenAI
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_community.vectorstores.weaviate import Weaviate
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings
from langchain_core.language_models.base import BaseLanguageModel
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (ChatPromptTemplate, MessagesPlaceholder,
                                    PromptTemplate)
from langchain_core.retrievers import BaseRetriever
from langchain_core.runnables import (ConfigurableField, Runnable,
                                      RunnableBranch, RunnableLambda,
                                      RunnableMap)
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from genai.applications.streamlit.chat.chain import answer_chain, get_retriever
from genai.applications.streamlit.chat.utils import load_api_key
from genai.tools.print_directory import get_structure

# FROM https://github.com/langchain-ai/chat-langchain/tree/master

openai_api_key = load_api_key()

WEAVIATE_URL = os.environ["WEAVIATE_URL"]
WEAVIATE_API_KEY = os.environ["WEAVIATE_API_KEY"]

# RECORD_MANAGER_DB_URL = os.environ["RECORD_MANAGER_DB_URL"]

# e

COMMAND_MAP = {
    "/help": "Get help",
    "/ls": "List the documentation structure",
    "/s": "Search the documentation.",
    "/": "Search the web"
}

def set_llm():
    llm = ChatOpenAI(
        model="gpt-3.5-turbo-1106",
        streaming=True,
        temperature=0,
    ).configurable_alternatives(
        # This gives this field an id
        # When configuring the end runnable, we can then use this id to configure this field
        ConfigurableField(id="llm"),
        default_key="openai_gpt_3_5_turbo",
        anthropic_claude_2_1=ChatAnthropic(
            model="claude-2.1",
            max_tokens=16384,
            temperature=0,
            anthropic_api_key=os.environ.get("ANTHROPIC_API_KEY", "not_provided"),
        ),
        fireworks_mixtral=ChatFireworks(
            model="accounts/fireworks/models/mixtral-8x7b-instruct",
            temperature=0,
            max_tokens=16384,
            fireworks_api_key=os.environ.get("FIREWORKS_API_KEY", "not_provided"),
        ),
        google_gemini_pro=ChatGoogleGenerativeAI(
            model="gemini-pro",
            temperature=0,
            convert_system_message_to_human=True,
            max_tokens=16384,
            google_api_key=os.environ.get("GOOGLE_API_KEY", "not_provided"),
        ),
    )
    return llm

llm = set_llm()

retriever = get_retriever(weaviate_url=WEAVIATE_URL, weaviate_docs_index_name=WEAVIATE_DOCS_INDEX_NAME)

# chain = answer_chain(llm, retriever)

def chain_answer(query):
    chain = answer_chain(llm, retriever)
    result = chain.invoke({"question": query, "chat_history": st.session_state.messages})
    return result


def route_prompt(prompt: str) -> str:
    """
    This performs syntax based routing for an input prompt.
    The syntax is as follows:
    - /ls
    - /search
    
    """
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=openai_api_key, streaming=True)

    
    
    available_commands = ["/help","/ls", "/s"]
    
    # st.write(f"prompt: {prompt}")
    st.session_state.messages.append({"role": "user", "content": prompt})
    if prompt.startswith("/help"):
        with st.chat_message("assistant"):
            st.session_state.messages.append({"role": "assistant", "content": f"Available commands: {available_commands}"})
            st.write(f"Available commands: {available_commands}")
    elif prompt.startswith("/ls"):

        open_markdown = False
        dir = "../../../../docs"
        if "-open_markdown" in prompt:
            open_markdown = True
            prompt = prompt.replace("-open_markdown", "")
        if len(prompt.split()) > 1:
            dir = prompt.split()[1]        
        results  = get_structure(dir, open_markdown=open_markdown)
        results = '\n'.join(results)
        with st.chat_message("assistant"):
            st.session_state.messages.append({"role": "assistant", "content": results})
            st.write(results)
    elif prompt.startswith("/s"):
        result = chain_answer(prompt.replace("/s", "").strip())
        with st.chat_message("assistant"):
            st.write("Searching:")
            st.session_state.messages.append({"role": "assistant", "content": result})
            st.write(result)
    else:
        response_with_chat(prompt, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, llm=llm)

import weaviate
from langchain.chains import ChatVectorDBChain
from langchain.llms import OpenAI
from langchain.vectorstores.weaviate import Weaviate


def response_with_chat(prompt: str, agent: AgentType, llm) -> str:
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.chat_message("user").write(prompt)

    if not openai_api_key:
        st.info("Please add your OpenAI API key to continue.")
        st.stop()

    search = DuckDuckGoSearchRun(name="Search")
    search_agent = initialize_agent([search], llm, agent=agent, handle_parsing_errors=True)
    with st.chat_message("assistant"):
        st_cb = StreamlitCallbackHandler(st.container(), expand_new_thoughts=False)
        response = search_agent.run(st.session_state.messages, callbacks=[st_cb])
        st.session_state.messages.append({"role": "assistant", "content": response})
        st.write(response)

st.title("🔎 Managen.AI\n  ## **Helping you to manage Gen()AI**")

command_string = '\n'.join([f"{c}: {v}" for (c, v) in COMMAND_MAP.items()])

f"You can use the following commands to interact with the agent:\n {command_string}"

@st.cache_resource
def get_messages():
    if "messages" not in st.session_state:
        st.session_state.messages = []
    return st.session_state.messages


st.session_state.messages = get_messages()

if "messages" not in st.session_state:
    st.session_state["messages"] = [
        {"role": "assistant", "content": "Hi, I'm a chatbot who can search the web. How can I help you?"}
    ]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

if prompt := st.chat_input(placeholder="Ask a question or type a command using '/' to begin"):
    prompt = route_prompt(prompt)


    
