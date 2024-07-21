import streamlit as st

from fileingestor import FileIngestor

# Set the title for the Streamlit app
st.title("Chat with PDF - 🦙 🔗")

# Create a file uploader in the sidebar
uploaded_file = st.sidebar.file_uploader("Upload File", type="pdf")

if uploaded_file:
    file_ingestor = FileIngestor(uploaded_file)
    file_ingestor.handlefileandingest()