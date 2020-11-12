process.env.NODE_ENV = 'test';

const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');

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
                .send("key=TES3&name=project")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                });
        });
        it('should not POST an existing project',  () => {
            chai.request(server)
                .post('/projects')
                .send("key=TES3&name=project")
                .end((err, res) => {
                    res.should.have.status(201);
                });
            chai.request(server)
                .post('/projects')
                .send("key=TES3&name=project")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                });
        });

    });

    describe('TTES-05 /PUT projects', () => {
        const name = "chaitest";
        const key = "CTES";
        let id;

        beforeEach((done) => {
            let project = new Project({name: name, key: key, backlog: new Backlog(), tasks: []});
            project.save().then(() => {
                Project.findOne({name: name}).then((p) => {
                    id = p._id;
                    done();
                });
            });
        });

        it('should PUT a project',  () => {
            console.log(id);
            chai.request(server)
                .put('/projects')
                .send("id=" + id + "&key=TES5&name=project")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                });
        });
        it('should not PUT a project with a wrong id',  () => {
            chai.request(server)
                .put('/projects')
                .send("id=7656&key=TES5&name=projects")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                });
        });

    });

    describe('TTES-02 /GET projects/create', () => {
        it('should GET a project form', () => {
            chai.request(server)
                .get('/projects/create')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                })
        });
    })
});
