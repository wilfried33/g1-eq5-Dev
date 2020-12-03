import functools as ft
import requests
import json
import trelloTools as ttools

todoID = "5fba9f4bb0753909be8d285a"
doingID = "5fba9f4e09b8760b0f131125"
doneID = "5fba9f4f86a9890a88678fb9"
postponedID = "5fba9f6dbb81f309ccd6e14d"
waitingListID = "5fbc1e0f1633c9696300d071"
oldListID = "5fbc4634ea01c87b03b78af8"

scriptCardID = "5fbd09e73a5ee441c642e999"

def getChangedCards():
    url = f"https://api.trello.com/1/cards/{scriptCardID}/attachments"
    headers = {
        "Accept": "application/json"
    }
    localQuery = ttools.QUERY()
    localQuery["fields"] = ["url"]
    response = requests.request(
        "GET",
        url,
        headers=headers,
        params=localQuery
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
    resMap = map(
        lambda attachment : (ttools.urlToCard(attachment['url']), attachment['id']), 
        json.loads(response.text)
        )
    return list(resMap)



def getCardsInChecklistByName(card, checklistName):
    checklists = ttools.getChecklists(card)
    if (checklistName in checklists):
        url = f"https://api.trello.com/1/checklists/{checklists[checklistName]}/checkitems"
        localQuery = ttools.QUERY()
        localQuery.update({
            "fields" : ['name']
        })
        response = requests.request(
            "GET",
            url,
            params=localQuery
        )
        if response.status_code != 200:
            print(f"ERROR {response.status_code} : {response.text}")
        listItems = json.loads(response.text)
        resMap = map(lambda item : ttools.urlToCard(item['name']), listItems)
        return list(resMap)
    else: 
        print(f"ERROR : {card['name']} does not contain the checklist '{checklistName}'")
        return []

def tick(sonCard, fatherCard, done):
    checklists = ttools.getChecklists(fatherCard)
    url = f"https://api.trello.com/1/checklists/{checklists['Nécessite']}/checkitems"
    localQuery = ttools.QUERY()
    localQuery.update({
        "fields" : ['name', 'state']
    })
    response = requests.request(
        "GET",
        url,
        params=localQuery
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
        
    checkItems = json.loads(response.text)
    item = next( item for item in checkItems if ttools.urlToCard(item['name'])['id'] == sonCard['id'] )
    

    if ( item['state'] == "complete" ) != done:
        url = f"https://api.trello.com/1/cards/{fatherCard['id']}/checkItem/{item['id']}"
        headers = {
            "Accept": "application/json"
        }
        localQuery = ttools.QUERY()
        localQuery.update({
            "state" : "complete" if done else "incomplete"
        })
        response = requests.request(
            "PUT",
            url,
            headers=headers,
            params=localQuery
        )
        if response.status_code != 200:
            print(f"ERROR {response.status_code} : {response.text}")
    return None

def mustWait(card):
    dependencies = ttools.getAttachedCardsUrl(card)
    areDependenciesDone = ft.reduce(
        lambda boolean, cardUrl : boolean and ttools.isDone(ttools.urlToCard(cardUrl)), 
        dependencies, 
        True)
    return not areDependenciesDone

#move carte
def moveCard(card, newListId): 
    url = f"https://api.trello.com/1/cards/{card['id']}"
    headers = {
    "Accept": "application/json"
    }
    localQuery = ttools.QUERY()
    localQuery['idList'] = newListId
    response = requests.request(
        "PUT",
        url,
        headers=headers,
        params=localQuery
    )

    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")
    return response.text

def removeAttachment(idAttachment):
    url = f"https://api.trello.com/1/cards/{scriptCardID}/attachments/{idAttachment}"
    response = requests.request(
        "DELETE",
        url,
        params=ttools.QUERY()
    )
    if response.status_code != 200:
        print(f"ERROR {response.status_code} : {response.text}")


def main(verbose=False):
    allCards = ttools.getAllCards()
    for card in allCards:
        for c in getCardsInChecklistByName(card, "Nécessaire pour"):
            tick(card, c, ttools.isDone(card))
            if ttools.isTodo(c) and mustWait(c):
                if verbose: print(f"{c['name']} must wait")
                moveCard(c, waitingListID)
            if ttools.isWaiting(c) and not mustWait(c):
                if verbose: print(f"{c['name']} should be done")
                moveCard(c, todoID)
        # removeAttachment(idAttachment)
        
main(verbose=True)
