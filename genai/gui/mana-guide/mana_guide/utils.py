import streamlit as st

def get_api_key(key_name="OPENAI_API_KEY"):
    import dotenv
    import os
    dotenv.load_dotenv()
    try:
        api_key = os.getenv(key_name)
    except:
        api_key = None
    return api_key

def load_api_key(key_name="OPENAI_API_KEY"):
    api_key = get_api_key(key_name)

    if not api_key and key_name not in st.secrets:
        if st.button("Go to settings"):
            st.switch_page("pages/Settings.py")   

    return api_key

