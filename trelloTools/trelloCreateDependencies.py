import json
import trelloTools as ttools
import requests
import re

def getStrDependencies(card):
    record = card['desc'].split("\n")
    strDependencies = record[1].split(": ")[1]
    return re.split(r'[\s]*,[\s]*', strDependencies) if strDependencies != '/' else []

def findCardByName(name, cardsList):
    return next(card for card in cardsList if card["name"] == name)

def initChecklists(card):
    url = f"https://api.trello.com/1/cards/{card['id']}/checklists"
    headers = {
        "Accept": "application/json"
    }
    def initChecklist(name):
        localQuery = ttools.QUERY()
        localQuery['name'] = name
        response = requests.request(
            "POST",
            url,
            headers=headers,
            params=localQuery
        )
        if response.status_code != 200:
            print(response.text)
        return json.loads(response.text)['id']
    res = {
        "necessiteID" : initChecklist("Nécessite"),
        "necessairesID" : initChecklist("Nécessaire pour")
    }
    return res

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

def createDependencies(cardsList):
    allCards = ttools.getAllCards()
    checklists = {}
    for card in cardsList:
        checklists[card["id"]] = initChecklists(card)
    for card in cardsList:
        cardID = card['id']
        strDependencies = getStrDependencies(card)
        necessaryCards = map(lambda strDependency : findCardByName(strDependency, allCards), strDependencies)
        for c in necessaryCards:
            # c est nécessaire pour card
            add2checklist(c['url'], checklists[cardID]["Nécessite"])
            add2checklist(card["url"], checklists[c['id']]["Nécessaire pour"])
