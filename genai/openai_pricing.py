
import requests
import os

def get_openai_cost_details(api_key, start_date, end_date, org_id=None):
    '''
    Get cost details from OpenAI.
    start_date and end_date format: 2023-05-28
    '''
    headers = {
        'authority': 'api.openai.com',
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'authorization': f'Bearer {api_key}',
        'origin': 'https://platform.openai.com',
        'referer': 'https://platform.openai.com/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36',
    }
    if org_id:
        headers['openai-organization'] = f'org-{org_id}'
    params = {
        'end_date': end_date,
        'start_date': start_date
    }
    response = requests.get(
      'https://api.openai.com/dashboard/billing/usage',
        params=params,
        headers=headers
    )
    return response.json()

def get_openai_subscription_details(api_key, org_id=None):
    '''
    Get subscription details from OpenAI
    '''
    headers = {
        'authority': 'api.openai.com',
        'accept': '*/*',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'authorization': f'Bearer {api_key}',
        'origin': 'https://platform.openai.com',
        'referer': 'https://platform.openai.com/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36',

    }
    if org_id:
        headers['openai-organization'] = f'org-{org_id}'
    response = requests.get('https://api.openai.com/dashboard/billing/subscription', headers=headers)
    return response.json()

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]     # set the one for which you want to calculate cost

print(OPENAI_API_KEY)

if __name__ == "__main__":
    print(get_openai_subscription_details(OPENAI_API_KEY))

    print(get_openai_cost_details(OPENAI_API_KEY, '2023-05-01', '2023-07-01'))