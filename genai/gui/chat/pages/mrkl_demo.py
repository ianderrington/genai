from pathlib import Path

import streamlit as st

from langchain import hub
from langchain.agents import AgentExecutor, Tool, create_react_agent
from langchain.chains import LLMMathChain
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain_community.utilities import DuckDuckGoSearchAPIWrapper, SQLDatabase
from langchain_core.runnables import RunnableConfig
from langchain_experimental.sql import SQLDatabaseChain
from langchain_openai import OpenAI

from langchain_community.chat_message_histories import StreamlitChatMessageHistory

# from streamlit_agent.callbacks.capturing_callback_handler import playback_callbacks
# from streamlit_agent.clear_results import with_clear_container

DB_PATH = (Path(__file__).parent / "Chinook.db").absolute()

# SAVED_SESSIONS = {
#     "Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?": "leo.pickle",
#     "What is the full name of the female artist who recently released an album called "
#     "'The Storm Before the Calm' and are they in the FooBar database? If so, what albums of theirs "
#     "are in the FooBar database?": "alanis.pickle",
# }

st.set_page_config(
    page_title="MRKL", page_icon="🦜", layout="wide", initial_sidebar_state="collapsed"
)

"# 🦜🔗 MRKL"


from genai.applications.streamlit.chat.utils import load_api_key
openai_api_key = load_api_key()

# tools setup
llm = OpenAI(temperature=0, openai_api_key=openai_api_key, streaming=True)
search = DuckDuckGoSearchAPIWrapper()
llm_math_chain = LLMMathChain.from_llm(llm)
db = SQLDatabase.from_uri(f"sqlite:///{DB_PATH}")
db_chain = SQLDatabaseChain.from_llm(llm, db)
tools = [
    Tool(
        name="Search",
        func=search.run,
        description="useful for when you need to answer questions about current events. You should ask targeted questions",
    ),
    Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="useful for when you need to answer questions about math",
    ),
    # Tool(
    #     name="FooBar DB",
    #     func=db_chain.run,
    #     description="useful for when you need to answer questions about FooBar. Input should be in the form of a question containing full context",
    # ),
]

# Initialize agent
react_agent = create_react_agent(llm, tools, hub.pull("hwchase17/react"))
mrkl = AgentExecutor(agent=react_agent, tools=tools)

# Set up memory
msgs = StreamlitChatMessageHistory(key="langchain_messages")
if len(msgs.messages) == 0:
    msgs.add_ai_message("How can I help you?")

for msg in msgs.messages:
    st.chat_message(msg.type).write(msg.content)


# If user inputs a new prompt, generate and draw a new response
if prompt := st.chat_input():
    st.chat_message("human").write(prompt)
    # Note: new messages are saved to history automatically by Langchain during run
    config = {"configurable": {"session_id": "any"}}
    # response = chain_with_history.invoke({"question": prompt}, config)
    answer = mrkl.invoke({"input": prompt})

    # answer_container.write(answer["output"])
    st.chat_message("ai").write(answer["output"])






