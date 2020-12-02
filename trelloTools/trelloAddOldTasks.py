# Meant to be used only once

import fileinput
import requests
import re
import trelloTools as ttools

boardID = "5fba9f34c7461d0a9496be2c"
oldListID = "5fbc4634ea01c87b03b78af8"

aliceID = "59a8725109a8dd7ff0455f52"
louisID = "5fbaa828b0cfcd0afbb2d7fb"
wilfriedID = "5f73516ad7177427945901c4"


def createOldCard(line):
    if re.match(r'\| T', line):
        task = re.split("\s*\|\s*", line)

        query = ttools.QUERY()
        query["idList"] = oldListID
        query['name'] = task[0]
        query['desc'] = ttools.makeDesc(task)

        url = f"https://api.trello.com/1/cards/"
        headers = {
            "Accept": "application/json"
        }
        response = requests.request(
            "POST",
            url,
            headers=headers,
            params=query
        )
        if response.status_code != 200:
            print(response.text)
        return response.text

def main():
    with fileinput.input(files=('Task1.md')) as f:
        for line in f:
            createOldCard(line)

main()