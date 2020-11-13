process.env.NODE_ENV = 'test';

const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Backlog routes', () => {
    const backlog = new Backlog({sprints:[], userstories:[]})
    const project = new Project({ name: "mochatest", key: "MTES", backlog: backlog, tasks: []});
    const name = "mochaUStest";
    const description = "Une description test";

    beforeEach((done) => {
        Project.deleteMany({}).then(() => done());
    });

    describe('TTES-12 /POST backlog', () => {
        it('should POST a userStory',  () => {
            chai.request(server)
                .post('/backlog?projectId='+project.id)
                .send("name="+name+"&description="+description)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                });
        });
        it('should not POST a userStory width projectId not valid',  () => {
            chai.request(server)
                .post('/backlog?projectId='+project.id)
                .send("name="+name+"&description="+description)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                });
        });
        it('should POST an existing userStory but generate differente ID',  () => {
            chai.request(server)
                .post('/backlog?projectId='+project.id)
                .send("name="+name+"&description="+description)
                .end((err, res) => {
                    res.should.have.status(201);
                });
            chai.request(server)
                .post('/backlog?projectId='+project.id)
                .send("name="+name+"&description="+description)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                });
        });

    });

    describe('TTES-12 /GET backlog/create', () => {
        it('should GET a userStory form', () => {
            chai.request(server)
                .get('/backlog/create?projectId=')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                });
        });
    });
});