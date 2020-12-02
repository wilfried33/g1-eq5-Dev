import functools as ft
import re
import fileinput
import trelloTools as ttools

def getTotalTime(
        nbDev = 3, 
        hoursPerDayPerDev = 1, 
        nbWeeks = 2, 
        nbDaysPerWeek = 5
        ):
    return nbDaysPerWeek * hoursPerDayPerDev * nbWeeks * nbDev

def getAllUs(fileName):
    res = [{
        "id": "ALL",
        "difficulty": 0
    }]
    with fileinput.input(files=(fileName)) as f:
        for line in f:
            if re.match(r'\| ID\d', line):
                issue = re.split(r"\s*\|\s*", line)
                res.append({
                    "id": issue[1],
                    "difficulty": int(issue[4])
                })
    return res

def genGetTasksByUS(fileNames):
    res = {}
    with fileinput.input(files=fileNames) as f:
        for line in f:
            if re.match(r'\| T', line):
                task = re.split(r"\s*\|\s*", line)
                if not (task[2] in res.keys()):
                    res[task[2]] = []
                res[task[2]].append(task[1])
    def getTasksByUs(us):
        return (res[us] if us in res.keys() else [])
    return getTasksByUs


def genIsTaskDone():
    cardsDone = []
    for listID in ttools.doneListsIDs : 
        cardsDone += ttools.getCardsFromListId(listID)
    def taskNameFromCard(card):
        return re.search(r'\) - (T[A-Z]+-[0-9]+)', card['name']).group(1)
    tasksDone = [ taskNameFromCard(card) for card in cardsDone]
    def isDone(task):
        return task in tasksDone
    return isDone


getTasksByUs = genGetTasksByUS(("Task2.md", "Task3.md"))
isTaskDone = genIsTaskDone()
# doneForLouis = ['ID01', 'ID02', 'ID03', 'ID05', 'ID06', 'ID07', 'ID09', 'ID10']

def isUsFinished(usId):
    tasks = getTasksByUs(usId)
    return (ft.reduce( 
        lambda areDone, task : areDone and isTaskDone(task), 
        tasks, bool(tasks)
        ) if tasks else False)

def main():
    allUs = getAllUs(fileName="README.md")
    totalLoadTrello = sum( us['difficulty'] for us in allUs if isUsFinished(us['id']) )
    # totalLoadLouis = sum( us['difficulty'] for us in allUs if us['id'] in doneForLouis )
    for us in allUs:
        if isUsFinished(us['id']): print(f"{us['id']} : {us['difficulty']}")
    print()
    # for us in (us for us in allUs if us['id'] in doneForLouis ):
    #     print(f"{us['id']} : {us['difficulty']}")
    #     for task in getTasksByUs(us['id']):
    #         if not isTaskDone(task) : print(f"\t{task} : {isTaskDone(task)}")
    # print( f"Nous avons réalisé une difficulté de {totalLoadTrello} (resp. {totalLoadLouis} en pratique) en un temps alloué de {getTotalTime()}, soit une vélocité de {totalLoadTrello / getTotalTime(): 2.2f} (resp. {totalLoadLouis / getTotalTime(): 2.2f}) difficulté/(h.homme)" )
    print( f"Nous avons réalisé une difficulté de {totalLoadTrello} en un temps alloué de {getTotalTime()}, soit une vélocité de {totalLoadTrello / getTotalTime():2.2f} difficulté/(h.homme)" )

main()