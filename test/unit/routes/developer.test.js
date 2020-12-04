process.env.NODE_ENV = 'test';

const Developer = require('../../../src/models/developer');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../src/app');


chai.use(chaiHttp);

describe('Developer routes', () => {

    const username = 'username';

    beforeEach((done) => {
        Developer.deleteMany({}).then(() => done());
    });

    describe('TTES-61 /POST developer', () => {

        it('should POST a developer', (done) => {
            chai.request(server)
                .post('/developer')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: username})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should not POST an existing developer', (done) => {
            let developer = new Developer({username: username});
            developer.save(
                chai.request(server)
                    .post('/developer')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({username: username})
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    }));
        });

        it('should not POST a developer without a name', (done) => {
            chai.request(server)
                .post('/developer')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});
