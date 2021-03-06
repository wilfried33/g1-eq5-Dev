const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');
const UserStory = require('../../../src/models/userStory');
const Sprint = require('../../../src/models/sprint');

const db = require('../../../config/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

function testRouteUpdateUS(done, status, id, name, description, difficulty, priority){
    chai.request(server)
        .put('/backlog/update')
        .send('_id='+id+'&name='+name+'&description='+description+'&difficulty='+difficulty+'&priority='+priority)
        .end((err, res) => {
            res.should.have.status(status);
            res.body.should.be.a('object');
            done();
        });
}

function testRouteUpdateSprint(done, status, id, name){
    chai.request(server)
        .put('/backlog/sprint/update')
        .send('_id='+id+'&name='+name)
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

    let project;

    beforeEach(async() => {
        await db.emptyCollections();
        await Project.deleteMany({});

        project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
        await project.save();
    });

    describe('TTES-35 /GET backlog', () => {
        it('should GET backlog and sprints of 1 project', (done) => {
            let cook = chai.request.agent(server);
            cook.get('/projects/select?projectId='+project._id)
                .end((err, res) => {
                    res.should.have.cookie('project');
                    return cook
                        .get('/backlog')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });
        });

        it('should not GET backlog and sprints with invalid projectId', (done) => {
            chai.request(server)
                .get('/backlog')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('TTES-12 /POST backlog', () => {
        it('should POST a userStory', (done) => {
            chai.request(server)
                .post('/backlog')
                .set('Cookie', 'project='+project._id)
                .send('name='+name+'&description='+description)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });

        });
        it('should not POST a userStory with invalid projectId', (done) => {
            chai.request(server)
                .post('/backlog')
                .set('Cookie', 'project=egZEGZBEZB')
                .send('name='+name+'&description='+description)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });

        });
        it('should POST an existing userStory but generate different ID', (done) => {
            chai.request(server)
                .post('/backlog')
                .set('Cookie', 'project='+project.id)
                .send('name='+name+'&description='+description)
                .end(() => {
                    chai.request(server)
                        .post('/backlog')
                        .set('Cookie', 'project='+project.id)
                        .send('name='+name+'&description='+description)
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            done();
                        });
                });

        });

    });

    describe('TTES-16 /PUT backlog/update', () => {
        const newName = 'nouveau nom';
        const newDescription = 'Une nouvelle description';
        const newPriority = 3;
        const newDifficulty = 5;
        let id;

        beforeEach((done) => {
            const userStory = new UserStory({id:idUS, name: name, description: description});
            userStory.save().then(() => {
                project.backlog.userStories.push(userStory);
                project.save().then(() => {
                    id = userStory._id;
                    done();
                });
            });
        });

        it('should PUT a userStory', (done) => {
            testRouteUpdateUS(done, 200, id, newName, newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a userStory with a wrong id', (done) => {
            testRouteUpdateUS(done, 400, 'zebze64eg6EG', newName, newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a unnamed userStory', (done) => {
            testRouteUpdateUS(done, 400, id, '', newDescription, newDifficulty, newPriority);
        });
        it('should not PUT a userStory with a negative priority', (done) => {
            testRouteUpdateUS(done, 400, id, newName, newDescription, newDifficulty, -2);
        });
        it('should not PUT a userStory with a wrong priority', (done) => {
            testRouteUpdateUS(done, 400, id, newName, newDescription, newDifficulty, 5);
        });

    });

    describe('/GET backlog/create', () => {
        it('should GET a userStory form', (done) => {
            chai.request(server)
                .get('/backlog/create')
                .set('Cookie', 'project='+project.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
        it('should not GET userStory form with invalid projectId', (done) => {
            chai.request(server)
                .get('/backlog/create')
                .set('Cookie', 'project=ebSBse')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET backlog/userStory', () => {
        let id;

        beforeEach(async () => {
            const userStory = new UserStory({id:idUS, name: name, description: description});
            await userStory.save();
            await project.backlog.userStories.push(userStory);
            await project.save();
            id = userStory._id;
        });

        it('should GET a userStory', (done) => {
            chai.request(server)
                .get('/backlog/create?id='+id)
                .set('Cookie', 'project='+project._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });
        it('should not GET userStory with invalid projectId', (done) => {
            chai.request(server)
                .get('/backlog/userStory?id='+id)
                .set('Cookie', 'project=ebSBse')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not GET userStory with invalid id', (done) => {
            chai.request(server)
                .get('/backlog/userStory?id=qrebqerb15eqrb')
                .set('Cookie', 'project='+project._id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('TTES-19 DELETE /backlog/delete', () => {
        let id;
        beforeEach(async () => {
            const userStory = new UserStory({id:idUS, name: name, description: description});
            await userStory.save();
            await project.backlog.userStories.push(userStory);
            await project.save();
            id = userStory._id;
        });

        it('should DELETE a userStory', (done) => {
            chai.request(server)
                .delete('/backlog/delete?id='+ id)
                .set('Cookie', 'project='+project.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not DELETE a userStory with a wrong id', (done) => {
            chai.request(server)
                .delete('/backlog/delete?id=00')
                .set('Cookie', 'project='+project.id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});

describe('Sprint routes', () => {
    const backlog = new Backlog({sprints:[], userStories:[]});
    const name = 'Sprint A';
    const startDate = '2020-11-5';
    const endDate = '2020-11-20';

    beforeEach(async () => {
        await Sprint.deleteMany({});
        await Project.deleteMany({});
        await UserStory.deleteMany({});
    });

    describe('TTES-27 /POST backlog/sprint', () => {
        it('should POST a sprint', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            project.save((err, project) => {
                chai.request(server)
                    .post('/backlog/sprint')
                    .set('Cookie', 'project='+project.id)
                    .send('name='+name+'&startDate='+startDate+'&endDate='+endDate)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
        it('should not POST a sprint with invalid projectId', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            project.save(() => {
                chai.request(server)
                    .post('/backlog/sprint')
                    .set('Cookie', 'project=egZEGZBEZB')
                    .send('name='+name+'&startDate='+startDate+'&endDate='+endDate)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        it('should not POST a sprint with invalid name', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            project.save(() => {
                chai.request(server)
                    .post('/backlog/sprint')
                    .set('Cookie', 'project='+project.id)
                    .send('name=&startDate='+startDate+'&endDate='+endDate)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        it('should not POST a sprint with invalid startDate', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            project.save(() => {
                chai.request(server)
                    .post('/backlog/sprint')
                    .set('Cookie', 'project='+project.id)
                    .send('name='+name+'&startDate=aevaevv&endDate='+endDate)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        it('should not POST a sprint with invalid endDate', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            project.save(() => {
                chai.request(server)
                    .post('/backlog/sprint')
                    .set('Cookie', 'project='+project.id)
                    .send('name='+name+'&startDate=zrhzhr&endDate=zrbzergb')
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

    });

    describe('TTES-30 /PUT backlog/sprint/update', () => {
        const newName = 'nouveau nom';
        const name = 'Sprint A';
        const startDate = '2020-11-5';
        const endDate = '2020-11-20';
        let id;

        beforeEach(async () => {
            const sprint = new Sprint({name: name, startDate:startDate, endDate:endDate});
            await sprint.save();
            id = sprint._id;
        });

        it('should PUT a sprint', (done) => {
            testRouteUpdateSprint(done, 200, id, newName);
        });
        it('should not PUT a sprint with a wrong id', (done) => {
            testRouteUpdateSprint(done, 400, 'zebze64eg6EG', newName);
        });
        it('should not PUT a unnamed sprint', (done) => {
            testRouteUpdateSprint(done, 400, id, '');
        });

    });

    describe('TTES-32 DELETE /backlog/delete/sprint', () => {
        let project;
        let id;

        beforeEach(async () => {
            await Project.deleteMany();
            const sprint = new Sprint({name: name, startDate:startDate, endDate:endDate});
            await sprint.save();
            id = sprint._id;
            project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            await project.backlog.sprints.push(id);
            await project.save();
        });

        it('should DELETE a sprint', (done) => {
            chai.request(server)
                .delete('/backlog/sprint/delete?id='+ id)
                .set('Cookie', 'project='+project._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not DELETE a sprint with a wrong id', (done) => {
            chai.request(server)
                .delete('/backlog/sprint/delete?id=00')
                .set('Cookie', 'project='+project._id)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not DELETE a sprint not empty', (done) => {
            const userStory = new UserStory({id:'FZE-01', name: 'name', description: 'description', sprint:id});
            userStory.save().then(() => {
                chai.request(server)
                    .delete('/backlog/sprint/delete?id='+ id)
                    .set('Cookie', 'project='+project._id)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
    });

    describe('TTES-27 /PUT backlog/userStorySprint', () => {
        let id, sprintId, projectId;
        beforeEach(async () => {
            const sprint = new Sprint({name: 'sprint1', startDate: '2020-12-09', endDate: '2020-12-23'});
            await sprint.save();
            sprintId = sprint._id;
            const userStory = new UserStory({id:'UD-18', name: 'name', description: 'description'});
            await userStory.save();
            id = userStory._id;
            const project = new Project({key:'MTES', name:'mochatest'});
            project.backlog.userStories.push(userStory);
            await project.save();
            projectId = project._id;
        });

        it('should update the sprint of a user story', (done) => {
            chai.request(server)
                .put('/backlog/userStorySprint?sprintId='+sprintId+'&_id='+id)
                .set('Cookie', 'project='+projectId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('should not update the sprint if parameters are missing', (done) => {
            chai.request(server)
                .put('/backlog/userStorySprint?projectId=&sprintId='+sprintId+'&_id='+id)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('should not update the sprint if there is a wrong parameter', (done) => {
            chai.request(server)
                .put('/backlog/userStorySprint?_id=00&sprintId='+sprintId)
                .set('Cookie', 'project='+projectId)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});

