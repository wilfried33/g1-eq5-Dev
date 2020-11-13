# Documentation
**feature not implemented yet**  
To build and run the project : 
* Make sur docker, npm/node and mongodb packages are installed.
* Then run : 
```
docker-compose up
```
You may need to run this as superuser.  
Now, you can find the web app on http://localhost:8080/

## Manually
Manually, the project can be run with the following lines in separated terminals : 
### Mongo
```
mongod
```
### Node
To install dependencies : 
```
npm install
```
### Server
To run server : 
```
npm start
```
### Tests
No need to start server separately  
Tests unitaires :
```
npm test
```
Tests End-to-End :
```
npm run e2e
```
