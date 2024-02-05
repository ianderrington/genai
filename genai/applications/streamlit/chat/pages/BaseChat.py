import streamlit as st

from langchain.agents import initialize_agent, AgentType
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain_community.chat_models import ChatOpenAI
from langchain_community.tools import DuckDuckGoSearchRun
from genai.applications.streamlit.chat.utils import load_api_key
from genai.tools.print_directory import get_structure

openai_api_key = load_api_key()


def route_prompt(prompt: str) -> str:
    """
    This performs syntax based routing for an input prompt.
    The syntax is as follows:
    - /ls
    - /search
    
    """
    available_commands = ["/help","/ls", "/search"]

    st.write(f"prompt: {prompt}")
    if prompt.startswith("/help"):
        with st.chat_message("assistant"):
            st.session_state.messages.append({"role": "assistant", "content": f"Available commands: {available_commands}"})
            st.write(f"Available commands: {available_commands}")
    elif prompt.startswith("/ls"):
        # get additional information from the line
        # such as open_markdown
        # parse this just like the command line with - flaggs calling the function inputs
        # /ls -open_markdown
        #  or
        # /ls -open_markdown dir
        # or 
        # /ls dir
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
    else:
        response_with_chat(prompt, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION)


def response_with_chat(prompt: str, agent: AgentType) -> str:
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)

        if not openai_api_key:
            st.info("Please add your OpenAI API key to continue.")
            st.stop()

        llm = ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=openai_api_key, streaming=True)
        search = DuckDuckGoSearchRun(name="Search")
        search_agent = initialize_agent([search], llm, agent=agent, handle_parsing_errors=True)
        with st.chat_message("assistant"):
            st_cb = StreamlitCallbackHandler(st.container(), expand_new_thoughts=False)
            response = search_agent.run(st.session_state.messages, callbacks=[st_cb])
            st.session_state.messages.append({"role": "assistant", "content": response})
            st.write(response)


st.title("🔎 LangChain - Chat with search")

"""
In this example, we're using `StreamlitCallbackHandler` to display the thoughts and actions of an agent in an interactive Streamlit app.
Try more LangChain 🤝 Streamlit Agent examples at [github.com/langchain-ai/streamlit-agent](https://github.com/langchain-ai/streamlit-agent).
"""

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


    
