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
        await db.dropDB();
        project = await projectService.addProject('mochatest', 'MOC');
    });

    describe('TTES-54 /POST /dod', () => {

        it('should POST a dod', (done) => {
            chai.request(server)
                .post('/dod')
                .query({projectId: project._id.toString()})
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({name: name, rules: rules})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should POST a dod without rules', (done) => {
            chai.request(server)
                .post('/dod')
                .query({projectId: project._id.toString()})
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({name: name})
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
                .send({name: name, rules: rules})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not POST a dod without a name', (done) => {
            chai.request(server)
                .post('/dod')
                .query({projectId: project._id.toString()})
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({rules: rules})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
});
