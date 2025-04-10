import os
import time
import requests
import json
import pandas as pd
from dotenv import load_dotenv


load_dotenv()
github_key = os.getenv("GITHUB_KEY")
headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {github_key}"
}


def get_data():
    

    base_url = "https://api.github.com"
    stargazer_url = "/repos/rust-lang/rust/stargazers"
    test_url = "/repos/cucharoth/chatroth/stats/contributors"
    url = base_url + stargazer_url
    
    all_results = []

    # sorted_data = sorted(data, key=lambda x: x["total"], reverse=True)
    page = 1
    while True:
        
        print(f'current page: {page}')
        response = requests.get(url + f'?per_page=100&page={page}', headers=headers)

        if response.status_code == 200:
            data = response.json()
            
            all_results.extend(data)
            print(f'datos en pagina: {len(data)}')

            
            # if less than 100 commits there's no more pages
            if len(data) < 100:
                break 
            
            # page += 1
            
            # 'don't get banned' check
            time.sleep(1)
        
        else:
            print(f"Error: {response.status_code}")
            print(f'{response.url}')
            break

    # parsing
    df = pd.json_normalize(
        all_results, 
        record_path=None, 
        meta=None, 
        errors='ignore'
    )

    # getting what I need
    # df_filtered = df[['total', 'author.login', 'author.id']]
    # changing column names
    # df_filtered.columns = ['Commits', 'Contributor', 'GitHub_ID']
    # df_filtered = df_filtered.sort_values(by='Commits', ascending=False)
    # df_filtered.info(verbose=False)
    
    print(df.head())
    df.to_csv("./data/rust_data.csv")

def get_repos():
    base_url = "https://api.github.com"
    stargazer_url = "/repos//rust/stargazers"
    test_url = "/repos/cucharoth/chatroth/stats/contributors"
    url = base_url + stargazer_url


if __name__ == "__main__":
    # get_data()
    get_repos()
