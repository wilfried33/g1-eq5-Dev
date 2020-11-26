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
    const name = 'mochaTasktest';
    const description = 'Une description test';
    const time = 1
    const dependency = ""
    
    let userStory;

    beforeEach(async() => {
        await Task.deleteMany({});
        await UserStory.deleteMany({});
        await Project.deleteMany({});

        userStory = new UserStory({id:"TGD-10", name: 'mochaUStest', description: 'Une description test'});
        await userStory.save();
    });

    describe('TTES-40 /POST task', () => {
        it('should POST a task',  (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save((err, project) => {
                chai.request(server)
                    .post('/task?projectId='+project._id)
                    .send('name='+name+'&description='+description+'&userStory='+userStory._id+'&timeEstimation='+time+'&dependency='+dependency)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
        it('should not POST a task width projectId not valid',  (done) => {
            let project = new Project({key:'MTES', name:'mochatest', backlog:backlog, task:[]});
            project.save(() => {
                chai.request(server)
                    .post('/task?projectId=egZEGZBEZB')
                    .send('name='+name+'&description='+description+'&userStory='+userStory+'&timeEstimation='+time+'&dependency='+dependency)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });
});