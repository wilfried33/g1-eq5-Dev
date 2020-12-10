const Developer = require('../../../src/models/developer');
const Project = require('../../../src/models/project');
const db = require('../../../config/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Developer routes', () => {
    const username = 'username';
    const type = 1;
    let projectId;

    beforeEach(async () => {
        await db.emptyCollections();
        await Project.deleteMany({});
        await Developer.deleteMany({});

        let project = new Project({key:'MTES', name:'mochatest'});
        await project.save();

        projectId = project._id;
    });

    describe('TTES-61 /POST developer', () => {

        it('should POST a developer', (done) => {
            chai.request(server)
                .post('/developer')
                .set('Cookie', 'project='+projectId)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: username, existName: -1, type: type })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should POST an existing developer', (done) => {
            let developer = new Developer({username: username, projectId:projectId, type:0});
            developer.save(
                chai.request(server)
                    .post('/developer')
                    .set('Cookie', 'project='+projectId)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({existName: developer._id.toString(), type: type })
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    }));
        });

        it('should not POST a developer without a name', (done) => {
            chai.request(server)
                .post('/developer')
                .set('Cookie', 'project='+projectId)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({existName: -1, type: type })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should not POST a developer without a project', (done) => {
            chai.request(server)
                .post('/developer')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: username, existName: -1, type: type })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should not POST a developer without a type', (done) => {
            chai.request(server)
                .post('/developer')
                .set('Cookie', 'project='+projectId)
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: username, existName: -1})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
