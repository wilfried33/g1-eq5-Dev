process.env.NODE_ENV = 'test';

const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');
const UserStory = require('../../../src/models/userStory');
const Task = require('../../../src/models/task');

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
    const dependency = '';
    
    let userStory;

    beforeEach(async() => {
        await Task.deleteMany({});
        await UserStory.deleteMany({});
        await Project.deleteMany({});

        userStory = new UserStory({id:'TGD-10', name: 'mochaUStest', description: 'Une description test'});
        await userStory.save();
    });

    describe('TTES-44 /GET task', () => {
        let task;

        beforeEach(async() => {
            task = new Task({id:'TTES-54', name:name, description:description, userStoryID:userStory._id, timeEstimation:time, dependency:dependency});
            await task.save();
        });

        it('should GET task of 1 project', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[task._id]});
            project.save((err, project) => {
                chai.request(server)
                    .get('/task?projectId='+project.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

        it('should not GET task width projectId not valid', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[task._id]});
            project.save(() => {
                chai.request(server)
                    .get('/task?projectId=aegz8e7bz8ebZB')
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });

    describe('TTES-40 /POST task', () => {
        it('should POST a task', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            project.save((err, project) => {
                chai.request(server)
                    .post('/task?projectId='+project._id)
                    .send('type='+type+'&name='+name+'&description='+description+'&userStory='+userStory._id+'&timeEstimation='+time+'&dependency='+dependency)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        it('should not POST a task width projectId not valid', (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[]});
            project.save(() => {
                chai.request(server)
                    .post('/task?projectId=egZEGZBEZB')
                    .send('type='+type+'&name='+name+'&description='+description+'&userStory='+userStory+'&timeEstimation='+time+'&dependency='+dependency)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });

    
    describe('TTES-56 /PUT task/update', () => {
        const newName = 'mochaTasktest';
        const newDescription = 'Une description test';
        const newTime = 1;
        const newDependency = '';

        let task;

        beforeEach(async () => {
            task = new Task({id:'TTES-54', name:name, description:description, userStoryID:userStory._id, timeEstimation:time, dependency:dependency});
            await task.save();
        });

        it('should PUT a task', (done) => {
            chai.request(server)
                .put('/task/update?')
                .send('_id='+task._id+'&name='+newName+'&description='+newDescription+'&timeEstimation='+newTime+'&dependency='+newDependency)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not PUT a task with a wrong id', (done) => {
            chai.request(server)
                .put('/task/update?')
                .send('_id=sb857sdb54878&name='+newName+'&description='+newDescription+'&timeEstimation='+newTime+'&dependency='+newDependency)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not PUT a unnamed task', (done) => {
            chai.request(server)
                .put('/task/update?')
                .send('_id='+task._id+'&name=&description='+newDescription+'&timeEstimation='+newTime+'&dependency='+newDependency)
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

        beforeEach(async () => {
            task = new Task({id:'TTES-54', name:name, description:description, userStoryID:userStory._id, timeEstimation:time, dependency:dependency});
            await task.save();
            await Project.deleteMany();
            project = new Project({key:'MTES', name:'mochatest', backlog:backlog, tasks:[task._id]});
            await project.save();
        });

        it('should DELETE a task', (done) => {
            chai.request(server)
                .delete('/task/delete?projectId='+project._id+'&_id='+task._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not DELETE a task with a wrong id', (done) => {
            chai.request(server)
                .delete('/task/delete?projectId='+project._id+'&_id=00')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});