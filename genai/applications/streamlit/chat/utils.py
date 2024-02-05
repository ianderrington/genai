import streamlit as st

def get_api_key():
    import dotenv
    import os
    dotenv.load_dotenv()
    try:
        openai_api_key = os.getenv("OPENAI_API_KEY")
    except:
        openai_api_key = None
    return openai_api_key

def load_api_key():
    openai_api_key = get_api_key()

    if not openai_api_key and "openai_api_key" not in st.secrets:
        if st.button("Go to settings"):
            st.switch_page("pages/Settings.py")   

    return openai_api_key