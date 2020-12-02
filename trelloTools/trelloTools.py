import requests
import json
import re
import functools as ft
import sys

from perso.params import *

if len(sys.argv) == 1:
    from perso.params import *
elif len(sys.argv) == 3:
    KEY = sys.argv[1],
    TOKEN = sys.argv[2],
def QUERY(): 
    return {
    'key': KEY,
    'token': TOKEN,
    }

todoID = "5fba9f4bb0753909be8d285a"
doingID = "5fba9f4e09b8760b0f131125"
done2ID = "5fba9f4f86a9890a88678fb9"
postponedID = "5fba9f6dbb81f309ccd6e14d"
waitingListID = "5fbc1e0f1633c9696300d071"
oldListID = "5fbc4634ea01c87b03b78af8"
done3ID = "5fc2324b5c48267177d9b0b4"

listIDs = [todoID, doingID, done2ID, done3ID, postponedID, waitingListID]
doneListsIDs = [done2ID, done3ID, oldListID]

aliceID = "59a8725109a8dd7ff0455f52"
louisID = "5fbaa828b0cfcd0afbb2d7fb"
wilfriedID = "5f73516ad7177427945901c4"

# nom , US , description, dépendances , charge, charge estimee , dev , status
# 0   , 1  , 2          , 3           , 4      , 5             , 6   , 7

def listToAdd(task):
    switcher = { 
        "TODO" : todoID,
        "DOING" : doingID,
        "DONE" : done2ID
    }
    return switcher[task[7]]

def makeDesc(task):
    res = ( f"US concernée : {task[1]:s}\n"
    f"Dépendances : {task[3]:s}\n"
    f"Charge estimée : {task[4]:s}\n"
    f"Charge réelle : {task[5]:s}\n\n"
    "----------\n"
    f"{task[2]:s}" )
    return res

def members(task):
    switcher = {
        "cartoonnerie": aliceID,
        "ljolliet": louisID,
        "wilfried": wilfriedID
    }
    return ([switcher[task[6]]] if task[6] else [])

def labels(task):
    switcher = {
        "TTES": "5fba9f34cdabcf46c0660326",
        "TDEV": "5fba9f34cdabcf46c0660328",
        "TDES": "5fba9f34cdabcf46c0660332"
    }
    typeTask = task[0].split('-')[0]
    return [switcher[typeTask]]

def getAttachedCardsUrl(card):
    url = f"https://api.trello.com/1/cards/{(card if isinstance(card, str) else card['id'])}/attachments"
    headers = {
        "Accept": "application/json"
    }
    localQuery = QUERY()
    localQuery["fields"] = ["url"]
    response = requests.request(
        "GET",
        url,
        headers=headers,
        params=localQuery
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
    resMap = map( lambda x : x['url'], json.loads(response.text))
    return list(resMap)

def urlToCard(link):
    url = re.sub(r'trello.com/c/([a-zA-Z0-9]+)/.*', r'trello.com/1/cards/\1/', link)
    localQuery = QUERY()
    response = requests.request(
        "GET",
        url,
        params=localQuery
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
    return json.loads(response.text)

def getChecklists(card):
    url = f"https://api.trello.com/1/cards/{card['id']}/checklists"
    headers = {
        "Accept": "application/json"
    }
    localQuery = QUERY()
    response = requests.request(
        "GET",
        url,
        headers=headers,
        params=localQuery
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
    def elt2dic(dic, elt):
        dic[elt['name']] = elt['id']
        return dic
    resMap = ft.reduce( elt2dic, json.loads(response.text), {} )
    return resMap

def getCardsFromListId(listID):
    url = f"https://api.trello.com/1/lists/{listID}/cards"
    localQuery = QUERY()
    response = requests.request(
        "GET",
        url,
        params=localQuery
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
    return json.loads(response.text)

def getAllCards():
    return ft.reduce(
        lambda res, listID : res + getCardsFromListId(listID), 
        listIDs, []
        )

def isDone(card):
   return card['idList'] in [done2ID, oldListID, done3ID]

def isTodo(card):
    return card['idList'] == todoID

def isWaiting(card):
    return card['idList'] == waitingListID



