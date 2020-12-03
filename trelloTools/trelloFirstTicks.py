# meant to be used only once

import trelloTriRoutine as tri
import trelloTools as ttool

def getDoneCards():
    return ttool.getCardsFromListId(ttool.doneID) + ttool.getCardsFromListId(ttool.oldListID)
    

def tickDependencies(card):
    for c in tri.getCardsInChecklistByName(card, "Nécessaire pour"):
        tri.tick(card, c, card['idList'] in [ttool.doneID, ttool.oldListID])
    return None

def main():
    allCards = getDoneCards()
    for card in allCards:
        tickDependencies(card)
    
# main()