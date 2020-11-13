process.env.NODE_ENV = 'test';

const assert = require('assert');
const backlogService = require('../../../src/services/backlogService');
const dbConfig = require('../../../config/db');
const UserStory = require('../../../src/models/userStory');


describe('Backlogs service', () => {
    const id = "MTES-02";
    const name = "mochaUStest";
    const description = "Une description test";

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', (done) => {
        UserStory.deleteMany({}).then(() => done());
    });

    describe('TTES-11 Create Backlog', () => {

        it('cannot add an empty backlog', (done) => {
            backlogService.addUserStory().catch(() => {
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('cannot add a backlog with no id', (done) => {
            backlogService.addUserStory(null, name, description).catch(() => {
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('cannot add a backlog with no name', (done) => {
            backlogService.addUserStory(id, null, description).catch(() => {
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('creates a backlog with out description', (done) => {
            backlogService.addUserStory(id, name, null)
            .then((data) => {
                assert(!data.isNew);
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 1);
                    done();
                });
            });
        });

        it('creates a backlog', (done) => {
            backlogService.addUserStory(id, name, description)
            .then((data) => {
                assert(!data.isNew);
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 1);
                    done();
                });
            });
        });

        it('cannot add the same project', (done) => {
            backlogService.addUserStory(id, name, description)
            .then(() =>  
                backlogService.addUserStory(id, name, description)
                .catch(() => {
                    UserStory.countDocuments((err, count) => {
                        assert.deepStrictEqual(count, 1);
                        done();
                    });
                })
            );
        });
    });
});
