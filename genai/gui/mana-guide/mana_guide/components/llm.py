## Chat models
from langchain_openai import AzureChatOpenAI
from langchain_community.chat_models import ChatOllama, ChatOpenAI 

## Embedding models
from langchain_core.embeddings import Embeddings

from langchain_openai import AzureOpenAIEmbeddings

from langchain_community.embeddings import OpenAIEmbeddings

# Needed for configurable alternatives
# from langchain_core.runnables import (ConfigurableField, Runnable,
#                                       RunnableBranch, RunnableLambda,
#                                       RunnableMap)
import os
from dotenv import load_dotenv
load_dotenv()

def get_llm(model='llama2'):
    if model == 'azure':
        model = AzureChatOpenAI(
            openai_api_version="2024-02-15-preview",
            azure_deployment=os.environ.get("AZURE_OPENAI_ENDPOINT", "not_provided"),
            )
        return model
    elif model == 'openai':
        return ChatOpenAI()
    elif model == 'llama2':
        llm = ChatOllama(
            model=model,
            streaming=True,
            temperature=0,
        )
    else:
        raise ValueError(f"Unknown LLM model: {model}")
    # TODO: Enable https://python.langchain.com/docs/expression_language/how_to/configure#configurable-alternatives
    #.configurable_alternatives(
        # This gives this field an id
        # When configuring the end runnable, we can then use this id to configure this field
        # ConfigurableField(id="llm"),
        # default_key="openai_gpt_3_5_turbo",
        # anthropic_claude_2_1=ChatAnthropic(
        #     model="claude-2.1",
        #     max_tokens=16384,
        #     temperature=0,
        #     anthropic_api_key=os.environ.get("ANTHROPIC_API_KEY", "not_provided"),
        # ),
        # fireworks_mixtral=ChatFireworks(
        #     model="accounts/fireworks/models/mixtral-8x7b-instruct",
        #     temperature=0,
        #     max_tokens=16384,
        #     fireworks_api_key=os.environ.get("FIREWORKS_API_KEY", "not_provided"),
        # ),
        # google_gemini_pro=ChatGoogleGenerativeAI(
        #     model="gemini-pro",
        #     temperature=0,
        #     convert_system_message_to_human=True,
        #     max_tokens=16384,
        #     google_api_key=os.environ.get("GOOGLE_API_KEY", "not_provided"),
        # ),
    # )
    return llm


def get_embedding_model(model='azure', chunk_size=200) -> Embeddings:
    # if os.environ.get("VOYAGE_API_KEY") and os.environ.get("VOYAGE_AI_MODEL"):
        # return VoyageEmbeddings(model=os.environ["VOYAGE_AI_MODEL"])
    if model == "openai":
        embeddings = OpenAIEmbeddings(chunk_size=chunk_size)
    elif model == 'azure':
        embeddings =  AzureOpenAIEmbeddings(
            api_key = os.getenv("AZURE_OPENAI_API_KEY"),  
            api_version = "2023-05-15",
            azure_endpoint =os.getenv("AZURE_OPENAI_ENDPOINT") 
        )
    else:
        raise ValueError(f"Unknown embedding model: {model}")
    return embeddings
