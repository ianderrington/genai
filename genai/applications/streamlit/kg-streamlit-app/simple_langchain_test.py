# from langchain.chat_models import AzureChatOpenAI
import os
from langchain_openai import AzureChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from dotenv import load_dotenv


load_dotenv()

chat_llm = AzureChatOpenAI(
    temperature=0,
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    openai_api_version=os.getenv("OPENAI_API_VERSION"),
    openai_api_base=os.getenv("OPENAI_API_BASE"),
    deployment_name="gpt-4",
)
## Build a multi-shot prompt
prompt = """You are a witty test responder. Please say something somewhat short and witty to the following (if any) data:\n{data}
"""


prompt_loop = ChatPromptTemplate.from_template(prompt) 

print(prompt_loop.invoke({'data': 'hi'}))

def chain_invoke(prompt_loop, chat_llm, data=None):
    if data is None:
        data = {}
    chain_test = prompt_loop | chat_llm | StrOutputParser()
    result = chain_test.invoke(data)
    return result
data = {"data": "hi"} 
result = chain_invoke(prompt_loop, chat_llm, data)

print(result)

