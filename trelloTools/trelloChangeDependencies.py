#meant to be used only once

import functools as ft
import requests
import re
from trelloTools import ttools

def getStrDependencies(card):
    record = card['desc'].split("\n")
    strDependencies = record[1].split(": ")[1]
    return re.split(r'[\s]*,[\s]*', strDependencies) if strDependencies != '/' else []

def findCardByName(name, cardsList):
    return next(card for card in cardsList if card["name"] == name)

def attach(fatherCard, sonCard):
    url = f"https://api.trello.com/1/cards/{fatherCard['id']}/attachments"
    headers = {
        "Accept": "application/json"
    }
    localQuery = ttools.QUERY()
    localQuery['name'] = sonCard['name']
    localQuery['url'] = sonCard['url']
    response = requests.request(
        "POST",
        url,
        headers=headers,
        params=localQuery
    )

    if response.status_code != 200:
        print(response.text)
    return response.text

def createAttachments(card, allCards):
    depList = getStrDependencies(card)
    for dep in depList:
        attach(card, findCardByName(dep, allCards))

def main():
    allCards = ttools.getAllCards()
    for card in allCards:
        createAttachments(card, allCards)

main()