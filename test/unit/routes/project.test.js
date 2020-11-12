process.env.NODE_ENV = 'test';

const Project = require('../../../src/models/project');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();


chai.use(chaiHttp);

describe('Projects', () => {

    beforeEach((done) => {
        Project.deleteMany({}).then(() => done());
    });

    describe('TTES-03 /POST projects', () => {
        it('should POST a project',  () => {
            chai.request(server)
                .post('/projects')
                .send("key=TES3&name=projects")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                });
        });
        it('should not POST an existing project',  () => {
            chai.request(server)
                .post('/projects')
                .send("key=TES3&name=projects")
                .end((err, res) => {
                    res.should.have.status(201);
                });
            chai.request(server)
                .post('/projects')
                .send("key=TES3&name=projects")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                });
        });

    });
});
