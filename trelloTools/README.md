The files in this folder are scripts that we used to fill up and update our trello board from markdown files.  
Many of those scripts were meant to be only used once. They are marked with a comment at the begining of the file and here is the list of all of them :
- `trelloAddOldTasks.py`
- `trelloChangeDependencies.py`
- `trelloChangeDependencies2.py`
- `trelloFirstTicks.py`
- `trelloTri.py`
- `trelloUSinTitle.py`

On the contrary, the following files have been and are meant to be used as many times as it is useful : 
- `toTrello.py` takes the path of a markdown file formated like `Tasks2.md` and fills up the Trello with a card per task
- `trelloComputeVelocity.py` computes the velocity of a given sprint
- `trelloCreateDependencies.py` creates and fills up checklists in the trello cards to implement dependencies in a practical way. It is used by `toTrello.md`
- `trelloTools.py` implements many functions that are used by many other scripts
- `trelloTriRoutine.py` checks the tasks that are done, checks the corresponding checkitems in the cards' checklists and moves the relevant cards from "WAITING DEPENDENCIES" to "TODO"

`trelloTools.py` either use trello's *key* and *token* from `perso/params.py` (this file is not on the repository because it contains private data) or from the first and second arguments given when calling the script that needs it.
