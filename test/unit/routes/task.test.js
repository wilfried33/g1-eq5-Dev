const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');
const UserStory = require('../../../src/models/userStory');
const Task = require('../../../src/models/task');
const db = require('../../../config/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Task routes', () => {
    const backlog = new Backlog({sprints:[], userStories:[]});
    const type = 2;
    const name = 'mochaTasktest';
    const description = 'Une description test';
    const time = 1;
    const dependencies = [];

    let userStory;

    beforeEach(async() => {
        await db.emptyCollections();

        userStory = new UserStory({id:'TGD-10', name: 'mochaUStest', description: 'Une description test'});
        await userStory.save();
    });

    describe('TTES-44 /GET task', () => {
        let task;
        let project;

        beforeEach(async() => {
            task = new Task({id:'TTES-54', name:name, description:description, userStoryID:userStory._id, timeEstimation:time});
            await task.save();
            project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[task._id]});
            await project.save();
        });

        it('should GET task of 1 project', (done) => {
            let cook = chai.request.agent(server);
            cook.get('/task')
                .set('Cookie', 'project='+project._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not GET task with invalid projectId', (done) => {
            chai.request(server)
                .get('/task')
                .set('Cookie', 'project=aegz8e7bz8ebZB')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('TTES-40 /POST task', () => {
        let project;
        beforeEach(async() => {
            project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            await project.save();
        });

        it('should POST a task', (done) => {
            chai.request(server)
                .post('/task')
                .set('Cookie', 'project='+project._id)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({type: type, name: name, description: description, userStory: userStory._id.toString(), timeEstimation: time, dependencies: dependencies})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not POST a task with invalid projectId', (done) => {
            chai.request(server)
                .post('/task')
                .set('Cookie', 'project=egZEGZBEZB')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({type: type, name: name, description: description, userStory: userStory._id.toString(), timeEstimation: time, dependencies: dependencies})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should POST a task without userStory', (done) => {
            chai.request(server)
                .post('/task')
                .set('Cookie', 'project='+project._id)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({type: type, name: name, description: description, timeEstimation: time, dependencies: dependencies})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('TTES-56 /PUT task/update', () => {
        const newName = 'mochaTasktest';
        const newDescription = 'Une description test';
        const newTime = 1;
        const wrongId = 'sb857sdb5488';
        let newDependencies = [];

        let task;

        beforeEach(async () => {
            let dependencyTask = new Task({id:'TTES-01', name:name, description:description, userStoryID:userStory._id, timeEstimation:time, dependencies:dependencies});
            await dependencyTask.save();
            task = new Task({id:'TTES-56', name:name, description:description, userStoryID:userStory._id, timeEstimation:time, dependencies:dependencies});
            await task.save();
            newDependencies.push(dependencyTask._id);
        });

        it('should PUT a task', (done) => {
            const stringDependencies = [];
            newDependencies.forEach(e => stringDependencies.push(e.toString()));
            chai.request(server)
                .put('/task/update')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({_id: task._id.toString(), name: newName, description: newDescription, timeEstimation: newTime, dependencies: stringDependencies})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not PUT a task with a wrong id', (done) => {
            chai.request(server)
                .put('/task/update')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({_id: wrongId, name: newName, description: newDescription, timeEstimation: newTime, dependencies: newDependencies})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not PUT a unnamed task', (done) => {
            chai.request(server)
                .put('/task/update')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({_id: task._id, description: newDescription, timeEstimation: newTime, dependencies: newDependencies})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should PUT a task without dependencies and userStory', (done) => {
            chai.request(server)
                .put('/task/update')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({_id: task._id.toString(), name: newName})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('TTES-63 /PUT task/update/status', () => {
        const status = 1;
        let task;

        beforeEach(async () => {
            task = new Task({id:'TTES-54', name:name, description:description, userStoryID:userStory._id, timeEstimation:time, dependencies:dependencies});
            await task.save();
        });

        it('should PUT a task status', (done) => {
            chai.request(server)
                .put('/task/update/status?_id='+task._id+'&status='+status)
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not PUT a task with a wrong id', (done) => {
            chai.request(server)
                .put('/task/update/status?_id=&status='+status)
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not PUT a task with a wrong status', (done) => {
            chai.request(server)
                .put('/task/update/status?_id='+task._id+'&status=-1')
                .set('content-type', 'application/x-www-form-urlencoded')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('TTES-56 DELETE /task/delete', () => {
        let project;
        let task;
        const wrongId = '-1';

        beforeEach(async () => {
            task = new Task({id:'TTES-54', name:name, description:description, userStoryID:userStory._id, timeEstimation:time, dependencies:dependencies});
            await task.save();
            await Project.deleteMany();
            project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[task._id]});
            await project.save();
        });

        it('should DELETE a task', (done) => {
            chai.request(server)
                .delete('/task/delete')
                .set('Cookie', 'project='+project._id.toString())
                .query({_id: task._id.toString()})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not DELETE a task with a wrong id', (done) => {
            chai.request(server)
                .delete('/task/delete')
                .query({projectId: project._id.toString(), _id: wrongId})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
