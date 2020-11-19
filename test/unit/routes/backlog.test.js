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

function testRouteUpdate(done, status, id, name, description, difficulty, priority){
    chai.request(server)
        .put('/backlog/update?_id='+id+'&name='+name+'&description='+description+'&difficulty='+difficulty+'&priority='+priority)
        .end((err, res) => {
            res.should.have.status(status);
            res.body.should.be.a('object');
            done();
        });
}

describe('Backlog routes', () => {
    const backlog = new Backlog({sprints:[], userStories:[]});
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
            project.save(() => {
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
            project.save(() => {
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
                    .end(() => {
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

        beforeEach((done) => {
            const userStory = new UserStory({id:idUS, name: name, description: description});
            userStory.save().then(() => {
                project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
                project.backlog.userStories.push(userStory);
                project.save().then(() => {
                    id = userStory._id;
                    done();
                });
            });
        });

        it('should PUT a userStory',  (done) => {
            testRouteUpdate(done, 200, id, newName, newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a userStory with a wrong id',  (done) => {
            testRouteUpdate(done, 400, 'zebze64eg6EG', newName, newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a unnamed userStory',  (done) => {
            testRouteUpdate(done, 400, id, '', newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a userStory with a negatif priority',  (done) => {
            testRouteUpdate(done, 400, id, newName, newDescription, newDifficulty, -2);
        });
        it('should not PUT a userStory with a wrong priority',  (done) => {
            testRouteUpdate(done, 400, id, newName, newDescription, newDifficulty, 5);
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
            project.save(() => {
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

    describe('TTES-19 DELETE /backlog/delete', () => {
        let project, id;
        beforeEach(async () => {
            const userStory = new UserStory({id:idUS, name: name, description: description});
            await userStory.save();
            project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            await project.backlog.userStories.push(userStory);
            await project.save();
            id = userStory._id;
        });

        it('should DELETE a userStory', (done) => {
            chai.request(server)
                .delete('/backlog/delete?projectId='+project.id+'&id='+ id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not DELETE a userStory with a wrong id', (done) => {
            chai.request(server)
                .delete('/backlog/delete?projectId='+project.id+'&id=00')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});


