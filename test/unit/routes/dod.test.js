const projectService = require('../../../src/services/projectService');
const dodService = require('../../../src/services/dodService');
const db = require('../../../config/db');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Dod routes', () => {
    const name = 'mochaDodtest';
    const rules = ['rule number 1', 'rule number 2'];
    let project;

    beforeEach('empty db', async() => {
        await db.emptyCollections();
        project = await projectService.addProject('mochatest', 'MOC');
    });

    describe('TTES-54 /POST /dod', () => {

        it('should POST a dod', (done) => {
            chai.request(server)
                .post('/dod')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({projectId: project._id.toString(), name: name, rules: rules})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should POST a dod without rules', (done) => {
            chai.request(server)
                .post('/dod')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({projectId: project._id.toString(), name: name})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not POST a dod without project_id', (done) => {
            chai.request(server)
                .post('/dod')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({projectId:null, name: name, rules: rules})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not POST a dod without a name', (done) => {
            chai.request(server)
                .post('/dod')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({projectId: project._id.toString(), rules: rules})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

    describe('Tests needing an existing dod', () => {

        let _dodId;

        beforeEach('Add dod', async() => {
            const dod = await dodService.addDod(project, name, rules);
            _dodId = dod._id;
        });

        describe('TTES-52 /PUT dod/update', () => {
            const newName = 'mochaDoDtestUpdate';
            const newRules = ['rule number 2', 'rule number 1'];

            it('should PUT a dod', (done) => {
                chai.request(server)
                    .put('/dod/update')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({_id: _dodId.toString(), name: newName, rules: newRules})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
            it('should not PUT a dod with a wrong id', (done) => {
                chai.request(server)
                    .put('/dod/update')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({_id: '-1', name: newName, rules: newRules})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });

            it('should not PUT a dod without a name', (done) => {
                chai.request(server)
                    .put('/dod/update')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({_id: _dodId.toString(), rules: newRules})
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
    });
});
