process.env.NODE_ENV = 'test';

const assert = require('assert');
const backlogService = require('../../../src/services/backlogService');
const dbConfig = require('../../../config/db');
const UserStory = require('../../../src/models/userStory');
const Backlog = require('../../../src/models/backlog')
const Project = require('../../../src/models/project')

describe('Backlogs service', () => {
    const backlog = new Backlog({sprints:[], userstories:[]})
    const project = new Project({ name: "mochatest", key: "MTES", backlog: backlog, tasks: []});
    const name = "mochaUStest";
    const description = "Une description test";

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', (done) => {
        UserStory.deleteMany({}).then(() => done());
    });

    describe('TTES-11 Create UserStory', () => {

        it('cannot add an empty userStory', (done) => {
            backlogService.addUserStory().catch(() => {
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('cannot add a userStory with no project', (done) => {
            backlogService.addUserStory(null, name, description).catch(() => {
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('cannot add a userStory with no name', (done) => {
            backlogService.addUserStory(project, null, description).catch(() => {
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('creates a userStory with out description', (done) => {
            backlogService.addUserStory(project, name, null)
            .then((data) => {
                assert(!data.isNew);
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 1);
                    done();
                });
            });
        });

        it('creates a userStory', (done) => {
            backlogService.addUserStory(project, name, description)
            .then((data) => {
                assert(!data.isNew);
                UserStory.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 1);
                    done();
                });
            });
        });
    });
});
