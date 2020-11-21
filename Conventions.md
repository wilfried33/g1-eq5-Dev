# CdP g1-eq5

## Conventions

### Commits
```<TAG> <TASK> comment```  
Avec `<TAG>` le type d'action réalisée et `<TASK>` l'id de la task réalisée.  
Les TAGs possibles sont :
- GP : Gestion de projet (ne nécessite pas de numéro de task)
- PARTIAL : Pour développer une task et indiquer qu'elle est en DOING
- CLOSE : Pour fermer une task et indiquer qu'elle est DONE
- FIX : Pour modifier une task lorsqu'il y a un bug par exemple

### Versioning
Il existe 2 repos principaux, un repo [Release](https://github.com/cartoonnerie/g1-eq5-Release) qui est mis à jour à la fin de chaque sprint via une pull request depuis le second repo [Dev](https://github.com/wilfried33/g1-eq5-Dev). 
Ce repo Dev étant mis à jour par uniquement 3 développeurs, aucune branche n'est mise en place.


### Fichiers
Tous les services présents dans le dossier src/services ont un nom de type `<concept métier>Service.js` : projectService.js par exemple.
Les tests sont eux séparés en deux dossiers principaux : unit et e2e. 
Les tests e2e suivent la convention suivante :
Le fichier gherkin se nomme `<US ID>.feature`, exemple : ID01.feature et le fichier de test selenium se nomme `<US ID>.js`.
Les tests unitaires testent les routes et les services séparément. On réplique donc l'architecture dans le dossier test de la façon suivante par example :
```
    src             
    |---routes    
        exemple.js 
    |---services  
        exempleService.js    
    tests           
        |---unit     
            |---routes   
                exemple.test.js    
            |---services     
                exempleService.test.js
```
Les fichiers de TU ont pour extension `.test.js`. 
