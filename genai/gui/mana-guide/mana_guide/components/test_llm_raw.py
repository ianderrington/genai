#Note: The openai-python library support for Azure OpenAI is in preview.
      #Note: This code sample requires OpenAI Python library version 1.0.0 or higher.
import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()



client = OpenAI(
)


message_text = [{"role":"system","content":"You are an AI assistant that helps people find information."}]

completion = client.chat.completions.create(
  model="gpt-4-32k", # model = "deployment_name"
  messages = message_text,
  temperature=0.7,
  max_tokens=800,
  top_p=0.95,
  frequency_penalty=0,
  presence_penalty=0,
  stop=None
)
print(completion.choices[0].message.content) # Output: "You are an AI assistant that helps people find information. How can I help you today?"