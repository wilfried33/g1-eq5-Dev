import functools as ft
import requests
import re
import json
import perso.params as params
import trelloTools as ttool

# url = "https://api.trello.com/1/cards/"

todoID = "5fba9f4bb0753909be8d285a"
doingID = "5fba9f4e09b8760b0f131125"
doneID = "5fba9f4f86a9890a88678fb9"
postponedID = "5fba9f6dbb81f309ccd6e14d"
waitingListID = "5fbc1e0f1633c9696300d071"

tasksDoneBefore = ["TDES-01", "TDES-02", "TDES-03", "TDES-04", "TDES-06", "TDES-07", "TDES-08", "TDES-14", "TDES-25", "TDEV-01", "TTES-01", "TDEV-02", "TTES-02", "TDEV-03", "TTES-03", "TDEV-04", "TDEV-05", "TDEV-06", "TTES-04", "TDEV-07", "TTES-05", "TDEV-08", "TDES-09", "TDEV-09", "TTES-07", "TDEV-10", "TTES-08", "TDEV-11", "TDES-10", "TTES-09", "TDEV-12", "TDEV-13", "TTES-11", "TDEV-12", "TDEV-14", "TTES-12", "TDEV-15", "TDEV-16", "TDEV-21", "TTES-35", "TDEV-36"]

#interpréter carte
tasksDone = map(lambda card: card["name"], ttool.getCardsFromListId(doneID))
tasksDone = list(tasksDone) + tasksDoneBefore
def isDone(taskName):
   return taskName in tasksDone

def getStrDependencies(card):
    record = card['desc'].split("\n")
    strDependencies = record[1].split(": ")[1]
    return re.split(r'[\s]*,[\s]*', strDependencies) if strDependencies != '/' else []

def mustWait(card):
    dependencies = getStrDependencies(card)
    dependenciesDone = ft.reduce(
        lambda boolean, taskName : boolean and isDone(taskName), 
        dependencies, 
        True)
    return not dependenciesDone

#move carte
def moveCard(card, newListId): 
    url = f"https://api.trello.com/1/cards/{card['id']}"
    headers = {
    "Accept": "application/json"
    }
    localQuery = params.QUERY()
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

def main():
    todoCards = ttool.getCardsFromListId(todoID)
    for card in todoCards:
        if mustWait(card):
            moveCard(card, waitingListID)
    waitingsCards = ttool.getCardsFromListId(waitingListID)
    for card in waitingsCards:
        if not mustWait(card):
            moveCard(card, todoID)

main()
