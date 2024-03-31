import argparse
import openai

# key = 'YOUR API KEY'  #@param {type: "string"}
import re, time, datetime, json, string, copy

import os
import dotenv
dotenv.load_dotenv()
key = os.getenv('OPENAI_API_KEY')

class SimpleLLMQueryBase:
  """This will be a base class for creating simple LLMs."""
  def __init__(self, api_key):
    self.api_key = api_key
  
  def create_llm(self, model_type):
    raise NotImplementedError("create_llm method must be implemented in the derived class.")

  def query(self, prompt): 
      raise NotImplementedError("query method must be implemented in the derived class.")


class OpenAILLMQuery(SimpleLLMQueryBase):
  def __init__(self, api_key, llm_name):
    super().__init__(api_key)
    self.gpt_client = openai.OpenAI(api_key=api_key)
    self.model_type = 'gpt'
    self.llm_name = llm_name

  def create_llm(self, model_type):
    return self.gpt_client

  def query(self, prompt, max_decode_steps=512, temperature=0.0, seconds_to_reset_tokens=60):
    while True:
        try:
          raw_response = self.gpt_client.chat.completions.with_raw_response.create(
            model=self.llm_name,
            
            max_tokens=max_decode_steps,
            temperature=temperature,
            messages=[
              {'role': 'user', 'content': prompt},
            ]
          )
          completion = raw_response.parse()
          return completion.choices[0].message.content
        except openai.RateLimitError as e:
          print(f'{datetime.datetime.now()}: query_gpt_model: RateLimitError {e.message}: {e}')
          time.sleep(seconds_to_reset_tokens)
        except openai.APIError as e:
          print(f'{datetime.datetime.now()}: query_gpt_model: APIError {e.message}: {e}')
          print(f'{datetime.datetime.now()}: query_gpt_model: Retrying after 5 seconds...')
          time.sleep(5)


class GeminiLLMQuery(SimpleLLMQueryBase):
  def __init__(self, api_key):
    super().__init__(api_key)
    import google.generativeai as genai
    self.genai.configure(api_key=api_key)
    self.model = genai.GenerativeModel('gemini-pro')
    self.model_type = 'gemini'

  def create_llm(self, model_type):
    return self.model

  def query(self, prompt):
    while True:
      try:
        response = self.model.generate_content(prompt)
        text_response = response.text.replace("**", "")
        return text_response
      except Exception as e:
        print(f'{datetime.datetime.now()}: query_gemini_model: Error: {e}')
        print(f'{datetime.datetime.now()}: query_gemini_model: Retrying after 5 seconds...')
        time.sleep(5)


class ModelManager:
  def __init__(self):
    self.llm_models = {'gpt': OpenAILLMQuery, 'gemini': GeminiLLMQuery}

    
  def get_llm(self, model_type ):

 

    if 'gpt' in model_type:
      api_key = os.getenv('OPENAI_API_KEY')

      model_type_key = 'gpt'
    else:
      raise ValueError("Gemini model is not tested.")
      api_key = os.getenv('GENAI_API_KEY')

      model_type_key = model_type

    if model_type_key in self.llm_models:
      return self.llm_models[model_type_key](api_key, model_type)
    else:
      raise ValueError(f"Model type {model_type_key} not supported.")


def get_args():

    parser = argparse.ArgumentParser(description="Query OpenAI GPT model.")
    parser.add_argument("prompt", type=str, help="The prompt to query the model.")
    parser.add_argument("--llm", type=str, default="gpt-3.5-turbo-1106", help="The language model to use.")
    parser.add_argument("--temperature", type=float, default=0.0, help="The sampling temperature.")
    parser.add_argument("--max_decode_steps", type=int, default=512, help="The maximum number of tokens to decode.")
    return parser.parse_args()


def main():
    args = get_args()
    # result = query_gpt_model(args.prompt, args.lm, args.temperature, args.max_decode_steps)
    model_manager = ModelManager()
    model_type = args.llm
  
    llm = model_manager.get_llm(model_type )
    result = llm.query(args.prompt)
    print(result)

if __name__ == "__main__":
    main()