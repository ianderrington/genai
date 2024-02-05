import streamlit as st
from genai.applications.streamlit.chat.utils import get_api_key

openai_api_key = get_api_key()
# with st.sidebar:
openai_api_key = st.text_input("OpenAI API Key",value=openai_api_key, key="langchain_search_api_key_openai", type="password")
"[Get an OpenAI API key](https://platform.openai.com/account/api-keys)"