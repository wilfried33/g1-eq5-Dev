import fileinput
import json
import requests
import sys
import re
import trelloTools as ttools
import trelloCreateDependencies as dep

url = "https://api.trello.com/1/cards/"
query = ttools.QUERY()

def addCardsFromMd(filename):
    # dependencies = {}
    newCards = []
    with fileinput.input(files=(filename)) as f:
        for line in f:
            if re.match(r'\| T', line):
                task = re.split(r"\s*\|\s*", line)[1:]
                query["idList"] = ttools.listToAdd(task)
                query['name'] = f"{task[1]} - {task[0]}"
                query['desc'] = ttools.makeDesc(task)
                query['idMembers'] = ttools.members(task)
                query['idLabels'] = ttools.labels(task)
                # strDependencies = task[3].split(": ")[1]
                
                r = requests.request(
                    "POST",
                    url,
                    params=query
                )

                if r.status_code != requests.codes.ok :
                    print(r.status_code, r.text)
                    break
                else:
                    newCards.append(json.loads(r.text))
    dep.createDependencies(newCards)


if len(sys.argv) > 1:
    addCardsFromMd(sys.argv[1])
else:
    print("ERROR : please give the markdown file path as an argument to this script")