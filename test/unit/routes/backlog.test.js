process.env.NODE_ENV = 'test';

const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');
const UserStory = require('../../../src/models/userStory');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

function testRouteUpdate(status, project, id, name, description, difficulty, priority){
    chai.request(server)
        .get('/backlog/update?projectId='+project+'&_id='+id+'&name='+name+'&description='+description+'&difficulty='+difficulty+'&priority='+priority)
        .end((err, res) => {
            res.should.have.status(status);
            res.body.should.be.a('object');
        });
}

describe('Backlog routes', () => {
    const backlog = new Backlog({sprints:[], userstories:[]});
    const idUS = 'PAC-01';
    const name = 'mochaUStest';
    const description = 'Une description test';

    beforeEach((done) => {
        UserStory.deleteMany({}).then(() =>
            Project.deleteMany({}).then(() => {
                done();
            }));
    });

    describe('TTES-35 /GET backlog', () => {
        it('should GET backlog and sprints of 1 project', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .get('/backlog?projectId='+project.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

        it('should not GET backlog and sprints width projectId not valid', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .get('/backlog?projectId=aegz8e7bz8ebZB')
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });

    describe('TTES-12 /POST backlog', () => {
        it('should POST a userStory',  (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .post('/backlog?projectId='+project.id)
                    .send('name='+name+'&description='+description)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        it('should not POST a userStory width projectId not valid',  (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .post('/backlog?projectId=egZEGZBEZB')
                    .send('name='+name+'&description='+description)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        it('should POST an existing userStory but generate differente ID',  (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .post('/backlog?projectId='+project.id)
                    .send('name='+name+'&description='+description)
                    .end((err, res) => {
                        chai.request(server)
                            .post('/backlog?projectId='+project.id)
                            .send('name='+name+'&description='+description)
                            .end((err, res) => {
                                res.should.have.status(201);
                                res.body.should.be.a('object');
                                done();
                            });
                    });

            });

        });

    });

    describe('TTES-16 /PUT backlog/update', () => {
        const newName = 'nouveaux nom';
        const newDescription = 'Une nouvelle description';
        const newPriority = 3;
        const newDifficulty = 5;
        let project;
        let id;
        let difficulty;
        let priority;

        beforeEach( async () => {
            const userStory = new UserStory({id:idUS, name: name, description: description});
            project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            await userStory.save();
            project.backlog.userStories.push(userStory);
            await project.save();
            id = userStory._id;
            difficulty = userStory.difficulty;
            priority = userStory.priority;
        });

        it('should PUT a userStory',  () => {
            testRouteUpdate(200, project.id, id, newName, newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a userStory with a wrong project',  () => {
            testRouteUpdate(400, 'srhq6gqz4eg1eg', id, newName, newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a userStory with a wrong id',  () => {
            testRouteUpdate(400, project.id, 'zebze64eg6EG', newName, newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a unnamed userStory',  () => {
            testRouteUpdate(400, project.id, id, '', newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a userStory with a negatif priority',  () => {
            testRouteUpdate(400, project.id, id, newName, newDescription, newDifficulty, -2);
        });
        it('should not PUT a userStory with a wrong priority',  () => {
            testRouteUpdate(400, project.id, id, newName, newDescription, newDifficulty, 5);
        });

    });

    describe('/GET backlog/create', () => {
        it('should GET a userStory form', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .get('/backlog/create?projectId='+project.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        it('should not GET userStory form width projectId not valid', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .get('/backlog/create?projectId=ebSBse')
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
    });
});
