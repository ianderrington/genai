import requests
from bs4 import BeautifulSoup


def get_response_from_url(url):
    response = requests.get(url)
    return response

def get_text_from_response(response, selector):
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        element = soup.select_one(selector)
        if element:
            return element.get_text()
    return None

def get_text_from_url(url, selector):
    response = get_response_from_url(url)
    return get_text_from_response(response, selector)

url = "https://www.arxiv-vanity.com/papers/2204.05862/"
# url = "https://arxiv.org/pdf/2204.05862.pdf"
selector = "#S1"

response = get_response_from_url(url)
print(response)
text = get_text_from_url(url, selector)
if text:
    print(text)
else:
    print("failed")
