Imports
import streamlit as st
from streamlit_chat import message
from streamlit_extras.colored_header import colored_header
import vertexai
from vertexai.preview.language_models import ChatModel

#Streamlit UI Parameters
st.title(":violet[Chat Bot via Streamlit]")
colored_header(label='', description='', color_name='gray-30')

# Initializing Vertex AI
vertexai.init(project="projectname", location="us-central1")

def generate_response(prompt):
    """Predict using a Large Language Model."""
    model = ChatModel.from_pretrained("chat-bison@001")
    chat = model.start_chat(examples=[])
    response = chat.send_message(prompt)
    output = response.text
    return output

# Initialize session state variables
if 'user_responses' not in st.session_state:
    st.session_state['user_responses'] = ["Hey"]
if 'bot_responses' not in st.session_state:
    st.session_state['bot_responses'] = ["Hey there! How may I help you today?"]

input_container = st.container()
response_container = st.container()

# Capture user input and display bot responses
user_input = st.text_input("You: ", "", key="input")

with response_container:
    if user_input:
        response = generate_response(user_input)
        st.session_state.user_responses.append(user_input)
        st.session_state.bot_responses.append(response)
        
    if st.session_state['bot_responses']:
        for i in range(len(st.session_state['bot_responses'])):
            message(st.session_state['user_responses'][i], is_user=True, key=str(i) + '_user', avatar_style="initials", seed="Kavita")
            message(st.session_state['bot_responses'][i], key=str(i), avatar_style="initials", seed="AI",)

with input_container:
    display_input = user_input