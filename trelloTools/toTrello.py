import fileinput
import requests
import sys
import re
import trelloTools as ttools

url = "https://api.trello.com/1/cards/"
query = ttools.QUERY()

def addCardsFromMd(filename):
    with fileinput.input(files=(filename)) as f:
        for line in f:
            if re.match(r'\| T', line):
                task = line.split("|")
                query["idList"] = ttools.listToAdd(task)
                query['name'] = task[0]
                query['desc'] = ttools.makeDesc(task)
                query['idMembers'] = ttools.members(task)
                query['idLabels'] = ttools.labels(task)
                
                r = requests.request(
                    "POST",
                    url,
                    params=query
                )

                if r.status_code != requests.codes.ok :
                    print(r.status_code, r.text)
                    break

if len(sys.argv) > 1:
    addCardsFromMd(sys.argv[1])
else:
    print("ERROR : please give the markdown file path as an argument to this script")