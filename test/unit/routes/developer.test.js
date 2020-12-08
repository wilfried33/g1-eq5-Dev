const Developer = require('../../../src/models/developer');
const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');
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
        db.dropDB();
        let project = new Project({key:'MTES', name:'mochatest'});
        await project.save();

        projectId = project._id;
    });

    describe('TTES-61 /POST developer', () => {

        it('should POST a developer', (done) => {
            chai.request(server)
                .post('/developer/create')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: username, projectId: projectId.toString(), type: type})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not POST an existing developer', (done) => {
            let developer = new Developer({username: username, projectId:projectId, type:0});
            developer.save(
                chai.request(server)
                    .post('/developer/create')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send('username=' +username+'&projectId='+projectId+'&type='+type)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    }));
        });

        it('should not POST a developer without a name', (done) => {
            chai.request(server)
                .post('/developer/create')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send('username=&projectId='+projectId+'&type='+type)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should not POST a developer without a project', (done) => {
            chai.request(server)
                .post('/developer/create')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send('username=' +username+'&projectId=&type='+type)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('should not POST a developer without a type', (done) => {
            chai.request(server)
                .post('/developer/create')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send('username=' +username+'&projectId='+projectId+'&type=198')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
