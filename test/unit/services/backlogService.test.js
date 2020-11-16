process.env.NODE_ENV = 'test';

const assert = require('assert');
const backlogService = require('../../../src/services/backlogService');
const dbConfig = require('../../../config/db');
const UserStory = require('../../../src/models/userStory');
const Backlog = require('../../../src/models/backlog');
const Project = require('../../../src/models/project');

describe('Backlogs service', () => {
    const backlog = new Backlog({sprints:[], userStories:[]});
    const project = new Project({ name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
    const name = 'mochaUStest';
    const description = 'Une description test';

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

    describe('TTES-34 ', () => {
        const backlog = new Backlog({sprints:[], userstories:[]});
        const project = new Project({ name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
        const idA = 'MTES-01';
        const idB = 'MTES-02';
        const nameA = 'mochaUStestA';
        const descriptionA = 'Une description test A';
        const nameB = 'mochaUStestB';
        const descriptionB = 'Une description test B';

        console.log('parameter');

        beforeEach('add a userStory', async () => {
            await Project.deleteMany({});
            let userstoryA = new UserStory({id: idA, name: nameA, description:descriptionA});
            await userstoryA.save();
            let userstoryB = new UserStory({id: idB, name: nameB, description:descriptionB});
            await userstoryB.save();
            project.backlog.userStories.push(userstoryA);
            project.backlog.userStories.push(userstoryB);
            await project.save();
        });

        it('return the backlog of project', async () => {
            let backlog = await backlogService.getBacklog(project);
            assert.deepStrictEqual(backlog.userStories.length, 2);
            assert.deepStrictEqual(backlog.userStories[0].name, nameA);
            assert.deepStrictEqual(backlog.userStories[1].name, nameB);
            assert.deepStrictEqual(backlog.userStories[0].description, descriptionA);
            assert.deepStrictEqual(backlog.userStories[1].description, descriptionB);
        });
    });
});
