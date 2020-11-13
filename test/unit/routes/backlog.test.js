process.env.NODE_ENV = 'test';

const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');
const UserStory = require('../../../src/models/userStory');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Backlog routes', () => {
    const backlog = new Backlog({sprints:[], userstories:[]})
    const name = "mochaUStest";
    const description = "Une description test";

    beforeEach((done) => {
        UserStory.deleteMany({}).then(() => 
            Project.deleteMany({}).then(() => {
                done()
        }));
    });

    describe('TTES-35 /GET backlog', () => {
        it('should GET backlog and sprints of 1 project', (done) => {
            let project = new Project({key:"MTES", name:"mochatest", backlog:backlog, task:[]})
            project.save((err, project) => {
                chai.request(server)
                .get('/backlog?projectId='+project.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done()
                })
            })
        });

        it('should not GET backlog and sprints width projectId not valid', (done) => {
            let project = new Project({key:"MTES", name:"mochatest", backlog:backlog, task:[]})
            project.save((err, project) => {
                chai.request(server)
                .get('/backlog?projectId=aegz8e7bz8ebZB')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done()
                })
            })
        });
    });

    describe('TTES-12 /POST backlog', () => {
        it('should POST a userStory',  (done) => {
            let project = new Project({key:"MTES", name:"mochatest", backlog:backlog, task:[]})
            project.save((err, project) => {
                chai.request(server)
                .post('/backlog?projectId='+project.id)
                .send("name="+name+"&description="+description)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done()
                })
            })
            
        });
        it('should not POST a userStory width projectId not valid',  (done) => {
            let project = new Project({key:"MTES", name:"mochatest", backlog:backlog, task:[]})
            project.save((err, project) => {
                chai.request(server)
                .post('/backlog?projectId=egZEGZBEZB')
                .send("name="+name+"&description="+description)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done()
                })
            })
            
        });
        it('should POST an existing userStory but generate differente ID',  (done) => {
            let project = new Project({key:"MTES", name:"mochatest", backlog:backlog, task:[]})
            project.save((err, project) => {
                chai.request(server)
                .post('/backlog?projectId='+project.id)
                .send("name="+name+"&description="+description)
                .end((err, res) => {
                    chai.request(server)
                    .post('/backlog?projectId='+project.id)
                    .send("name="+name+"&description="+description)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done()
                    })
                });
                
            })
            
        });

    });

    describe('TTES-12 /GET backlog/create', () => {
        it('should GET a userStory form', (done) => {
            let project = new Project({key:"MTES", name:"mochatest", backlog:backlog, task:[]})
            project.save((err, project) => {
                chai.request(server)
                .get('/backlog/create?projectId='+project.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done()
                })
            })
            
        });
        it('should not GET userStory form width projectId not valid', (done) => {
            let project = new Project({key:"MTES", name:"mochatest", backlog:backlog, task:[]})
            project.save((err, project) => {
                chai.request(server)
                .get('/backlog/create?projectId=ebSBse')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                })
            })
            
        });
    });
});