from litellm import completion
import os

import dotenv

dotenv.load_dotenv()

response = completion(
  model="openrouter/gryphe/mythomist-7b", 
  messages = [{ "content": "Hello, how are you?","role": "user"}],
  stream=True,
)

for chunk in response: 
  print(chunk['content'])