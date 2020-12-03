# Meant to be used only once

import functools as ft
import requests
import re
import json
import trelloTools as ttools

boardID = "5fba9f34c7461d0a9496be2c"

#récupérer cartes
def getCards():
    url = f"https://api.trello.com/1/boards/{boardID}/cards"
    localQuery = ttools.QUERY()
    response = requests.request(
        "GET",
        url,
        params=localQuery
    )
    if response.status_code != 200:
        print(response.text)
    return json.loads(response.text)

# add elt to checklist
def add2checklist(link, checklistID):
    url = f"https://api.trello.com/1/checklists/{checklistID}/checkitems"
    headers = {
        "Accept": "application/json"
    }
    localQuery = ttools.QUERY()
    localQuery['name'] = link
    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=localQuery
    )
    if response.status_code != 200:
        print(response.text)
    return response.text

def main():
    allCards = getCards()
    checklists = {}
    for card in allCards:
        checklists[card["id"]] = ttools.initChecklists(card)
    for card in allCards:
        cardID = card['id']
        necessaryLinks = ttools.getAttachedCardsUrl(card)
        for cLink in necessaryLinks:
            cID = ttools.urlToCard(cLink)['id']
            # c est nécessaire pour card
            add2checklist(cLink, checklists[cardID]["Nécessite"])
            add2checklist(card["url"], checklists[cID]["Nécessaire pour"])

# main()