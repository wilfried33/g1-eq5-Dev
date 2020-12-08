const projectService = require('../../../src/services/projectService');
const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');
const db = require('../../../config/db');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Projects routes', () => {

    beforeEach(async () => {
        await db.emptyCollections();
    });

    describe('TTES-08 /GET projects', () => {
        it('should GET projects list ', (done) => {
            chai.request(server)
                .get('/projects')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('TTES-03 /POST projects', () => {
        it('should POST a project', (done) => {
            chai.request(server)
                .post('/projects')
                .send('key=TES3&name=project')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not POST an existing project', (done) => {
            let project = new Project({key:'TES3', name:'project', backlog:new Backlog(), tasks:[]});
            project.save(() => {
                chai.request(server)
                    .post('/projects')
                    .send('key=TES3&name=project')
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

    });

    describe('TTES-05 /PUT projects', () => {
        const name = 'chaitest';
        const key = 'CTES';
        let id;

        beforeEach(async () => {
            const project = await projectService.addProject(name, key);
            id = project._id;
        });

        it('should PUT a project', (done) => {
            chai.request(server)
                .put('/projects/update')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({_id: id.toString(), name: 'project'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('should not PUT a project with a wrong id', (done) => {
            chai.request(server)
                .put('/projects/update')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({_id: '-1', name: 'project'})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('TTES-02 /GET projects/create', () => {
        it('should GET a project form', (done) => {
            chai.request(server)
                .get('/projects/create')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
