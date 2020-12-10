# Documentation
##Production
To build and run the project in production environnement : 
* Make sur docker and npm/node packages are installed.
* Then run : 
```
docker-compose up
```
You may need to run this as superuser.  
Now, you can find the web app on http://localhost:8080/

## Development
Thee project can be run with the following lines in separated terminals (you may need to run this as superuser) : 
### Mongo
```
mongod
```
### Server
To install dependencies : 
```
npm install
```
To run server : 
```
npm start
```
Then, you can find the web app on http://localhost:8080/
### Tests
No need to start server separately  
Unit tests :
```
npm test
```
Tests End-to-End :
```
npm run e2e
```
