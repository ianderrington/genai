import os
from operator import itemgetter
from typing import Dict, List, Optional, Sequence
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

import streamlit as st
# import weaviate
# from langsmith import Client
from langchain.agents import AgentType, initialize_agent
# from langchain.chains import ChatVectorDBChain
# from langchain.vectorstores.weaviate import Weaviate
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain_community.chat_models import ChatOpenAI
from langchain_community.chat_models import AzureChatOpenAI
# from langchain_community.chat_models.anthropic import ChatAnthropic
# from langchain_community.chat_models.fireworks import ChatFireworks
# from langchain_community.embeddings.voyageai import VoyageEmbeddings
# from langchain_community.llms import OpenAI
from langchain_community.tools import DuckDuckGoSearchRun
# from langchain_community.vectorstores.weaviate import Weaviate
# from langchain_core.documents import Document
# from langchain_core.embeddings import Embeddings
# from langchain_core.language_models.base import BaseLanguageModel
# from langchain_core.messages import AIMessage, HumanMessage
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.prompts import (ChatPromptTemplate, MessagesPlaceholder,
#                                     PromptTemplate)
# from langchain_core.retrievers import BaseRetriever

# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from mana_guide.components.constants import DOCS_INDEX_NAME
from mana_guide.components.chain import answer_chain, get_retriever
# from components.utils import load_api_key
# from .tools.print_directory import get_structure

from mana_guide.components.llm import get_llm, get_embedding_model

# FROM https://github.com/langchain-ai/chat-langchain/tree/master

# working_directory = './workdirs/2024-03-13'
# os.chdir(working_directory)

def main_page():
    COMMAND_MAP = {
        "?": "Get help",
        "!": "Execute a bash command",
        "/s": "Search the documentation.",
        "/w": "Search the web",
        "/i": "Ingest the component into the database",
    }
    command_print = "  \n".join([f"{a}:" f"{v}" for a, v in COMMAND_MAP.items()])

    llm = get_llm()

    # retriever = get_retriever('weaviate', weaviate_url=WEAVIATE_URL, weaviate_docs_index_name=DOCS_INDEX_NAME)
    qdrant_path = 'qdrant'

    embedding_model = get_embedding_model()
    vector_database_path = 'http://localhost:6333'
    retriever = get_retriever(retriever_name='qdrant', embedding_model=embedding_model, url=vector_database_path, collection_name=DOCS_INDEX_NAME)

    # chain = answer_chain(llm, retriever)

    def prepare_new_lines(text: str) -> str:
        return text.replace("\n", "  \n")

    def chain_answer(query):
        chain = answer_chain(llm, retriever)
        result = chain.invoke({"question": query, "chat_history": st.session_state.messages})
        return result


    def route_prompt(prompt: str) -> str:
        """
        This performs syntax based routing for an input prompt.
    
        """
        # Refactoring note: This should be made into a modular system for routing different modules and integrating them with internal and shared memory
        st.session_state.messages.append({"role": "user", "content": prompt})
        if prompt.startswith("?"):
            with st.chat_message("assistant"):
                st.write(f"Available commands: {command_print}")
        elif prompt.startswith("!"):
            ## This indicates executing a bash command
            command = prompt.replace("!", "")
            with st.chat_message("assistant"):
                st.session_state.messages.append({"role": "assistant", "content": f"Executing command: {command}"})
                st.write(f"Executing command: ```bash  \n {command} \n ```")
                result = os.popen(command).read()
                st.session_state.messages.append({"role": "assistant", "content": result})
                st.write(prepare_new_lines("```bash  \n " + result + "  \n```"))
                
        elif prompt.startswith("/s"):
            prompt = prompt.replace("/s", "").strip()
            result = chain_answer(prompt)
            response_with_agent(prompt, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, llm=llm)
        elif prompt.startswith("/w"):
            prompt = prompt.replace("/w", "").strip()
            response_with_agent(prompt, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, llm=llm)
        else:
            result = chain_answer(prompt)         
            with st.chat_message("assistant"):
                st.session_state.messages.append({"role": "assistant", "content": result})
                st.write(result)


    def response_with_agent(prompt: str, agent: AgentType, llm) -> str:
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)

        search = DuckDuckGoSearchRun(name="Search")
        search_agent = initialize_agent([search], llm, agent=agent, handle_parsing_errors=True)
        with st.chat_message("assistant"):
            st_cb = StreamlitCallbackHandler(st.container(), expand_new_thoughts=False)
            response = search_agent.run(st.session_state.messages, callbacks=[st_cb])
            st.session_state.messages.append({"role": "assistant", "content": response})
            st.write(response)

    st.title("🔎Core Team Agentic Intelligence")

    command_string = '\n'.join([f"{c}: {v}" for (c, v) in COMMAND_MAP.items()])

    f"You can use the following commands to interact with the agents:\n {command_string}"

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

def main():
    main_page()

if __name__ == "__main__":
    main_page()