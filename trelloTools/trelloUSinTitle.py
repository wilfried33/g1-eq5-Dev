# meant to be used only once

import trelloTools as ttools
import perso.params as params
import requests
import re

def putUSinName(card):
    name = re.sub(r"ID([0-9]+)", r"US\1", card['name'])
    url = f"https://api.trello.com/1/cards/{card['id']}/"
    headers = {
        "Accept": "application/json"
    }
    localQuery = dict(params.QUERY())
    localQuery.update({
        "name": name
    })
    response = requests.request(
        "PUT",
        url,
        headers=headers,
        params=localQuery
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
    

def main():
    for card in ttools.getAllCards():
        putUSinName(card)

# main()