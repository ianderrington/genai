import requests
import json
import dotenv
import os
from dotenv import load_dotenv
load_dotenv()

# set up the request parameters
params = {
'api_key': os.getenv('SERPER_API_KEY'),
  'q': 'pizza'
}

# make the http GET request to Scale SERP
api_result = requests.get('https://api.scaleserp.com/search', params)

# print the JSON response from Scale SERP
print(json.dumps(api_result.json()))
