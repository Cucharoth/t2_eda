import os
import requests
import json
import pandas as pd
from dotenv import load_dotenv


load_dotenv()
github_key = os.getenv("GITHUB_KEY")

def get_commits_stats():
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {github_key}"
    }

    base_url = "https://api.github.com"
    git_stats_url = "/repos/git/git/stats/contributors"
    test_url = "/repos/cucharoth/chatroth/stats/contributors"
    response = requests.get(base_url + git_stats_url, headers=headers)
    


    if response.status_code == 200:
        data = response.json()
        sorted_data = sorted(data, key=lambda x: x["total"], reverse=True)

        # parsing
        df = pd.json_normalize(
            sorted_data, 
            record_path=None, 
            meta=None, 
            errors='ignore'
        )

        # getting what I need
        df_filtered = df[['total', 'author.login', 'author.id']]
        # changing column names
        df_filtered.columns = ['Commits', 'Contributor', 'GitHub_ID']
        # df_filtered = df_filtered.sort_values(by='Commits', ascending=False)
        df_filtered.info(verbose=False)
        
        print(df_filtered.head())
        # df_filtered.to_csv("./data/git_commits_stats.csv")

    elif response.status_code == 202:
        print("Compiling data, try again shortly")
    else:
        print(f"Error: {response.status_code}")



def get_contributions():
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {github_key}"
    }

    base_url = "https://api.github.com"
    git_contributors_url = "/repos/git/git/contributors"
    test_url = "/repos/cucharoth/chatroth/contributors"
    url = base_url + git_contributors_url

    all_results = []

    while url:
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            print(response.headers.get("Link", ""))
            data = response.json()
            
            all_results.extend(data)

            link_header = response.headers.get("Link", "")
            next_url = None
            for link in link_header.split(","):
                if 'rel="next"' in link:
                    next_url = link[link.find("<")+1:link.find(">")]
                    break

            url = next_url
            
        elif response.status_code == 202:
            print("Compiling data, try again shortly")
            break
        else:
            print(f"Error: {response.status_code}")
            break

    # parsing
    df = pd.json_normalize(
        all_results, 
        record_path=None, 
        meta=None, 
        errors='ignore'
    )
    # getting what I need
    df_filtered = df[['contributions', 'login', 'id']]
    # changing column names
    df_filtered.columns = ['Contributions', 'Contributor', 'GitHub_ID']
    # df_filtered = df_filtered.sort_values(by='Commits', ascending=False)
    df_filtered.info(verbose=False)
    
    print(df_filtered.head())
    # df_filtered.to_csv("./data/git_contributors.csv")

if __name__ == "__main__":
    # get_commits_stats()
    get_contributions()
