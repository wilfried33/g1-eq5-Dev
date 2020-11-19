process.env.NODE_ENV = 'test';

const assert = require('assert');
const backlogService = require('../../../src/services/backlogService');
const dbConfig = require('../../../config/db');
const UserStory = require('../../../src/models/userStory');
const Backlog = require('../../../src/models/backlog');
const Project = require('../../../src/models/project');
const Sprint = require('../../../src/models/sprint');
const { deleteMany } = require('../../../src/models/userStory');

function testCatchAddUS(done, project, name, description){
    backlogService.addUserStory(project, name, description)
    .catch(() => {
        UserStory.countDocuments((err, count) => {
            assert.deepStrictEqual(count, 0);
            done();
        })
    })
}

function testThenAddUS(done, project, name, description){
    backlogService.addUserStory(project, name, description)
    .then((data) => {
        assert(!data.isNew);
        UserStory.countDocuments((err, count) => {
            assert.deepStrictEqual(count, 1);
            done();
        });
    });
}

function testCatchUpdate(done, id, name, description, difficulty, priority, objId, objName, objDescription, objDifficulty, objPriority){
    backlogService.updateUserStory(id, name, description, difficulty, priority)
    .then(value => assert(value))
    .catch(() => {
        UserStory.findById(objId)
        .then((p) => {
            assert.deepStrictEqual(p._id, objId);
            assert.deepStrictEqual(p.name, objName);
            assert.deepStrictEqual(p.description, objDescription);
            assert.deepStrictEqual(p.difficulty, objDifficulty);
            assert.deepStrictEqual(p.priority, objPriority);
            done();
        });
    });
}

function testCatchAddSprint(done, project, name, startDate, endDate){
    backlogService.addSprint(project, name, startDate, endDate)
    .catch(() => {
        Sprint.countDocuments((err, count) => {
            assert.deepStrictEqual(count, 0);
            done();
        })
    })
}

function testThenAddSprint(done, project, name, startDate, endDate){
    backlogService.addSprint(project, name, startDate, endDate)
    .then((data) => {
        assert(!data.isNew);
        Sprint.countDocuments((err, count) => {
            assert.deepStrictEqual(count, 1);
            done();
        });
    });
}

describe('Backlogs service', () => {
    const backlog = new Backlog({sprints:[], userStories:[]});
    const project = new Project({ name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
    const name = 'mochaUStest';
    const description = 'Une description test';

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', async () => {
        await UserStory.deleteMany({})
        await Sprint.deleteMany({})
    });

    describe('TTES-11 Create UserStory', () => {

        it('cannot add an empty userStory', (done) => {
            testCatchAddUS(done, null, null, null);
        });
        it('cannot add a userStory with no project', (done) => {
            testCatchAddUS(done, null, name, description);
        });
        it('cannot add a userStory with no name', (done) => {
            testCatchAddUS(done, project, null, description);
        });
        it('creates a userStory with out description', (done) => {
            testThenAddUS(done, project, name, null);
        });
        it('creates a userStory', (done) => {
            testThenAddUS(done, project, name, description);
        });
    });

    describe('TTES-14 Update UserStory', () => {
        let id;
        let difficulty;
        let priority;
        const idUS = "PAC-01"
        const newName = 'mochaUStest BIS';
        const newDescription = 'Une description test BIS';
        const newDifficulty = 5;
        const newPriority = 3;

        beforeEach('create a userStory',  async () => {
            let userstory = new UserStory({id:idUS, name: name, description: description});
            await userstory.save()
            id = userstory._id;
            difficulty = userstory.difficulty;
            priority = userstory.priority;
        });

        it('cannot update with empty values', (done) => {
            testCatchUpdate(done, null, null, null, null, null, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no id', (done) => {
            testCatchUpdate(done, null, newName, newDescription, newDifficulty, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no name', (done) => {
            testCatchUpdate(done, id, null, newDescription, newDifficulty, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no difficulty', (done) => {
            testCatchUpdate(done, id, name, newDescription, null, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no priority', (done) => {
            testCatchUpdate(done, id, name, newDescription, newDifficulty, null, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with invalid id', (done) => {
            testCatchUpdate(done, 'iybefbyvbuyb', newName, newDescription, newDifficulty, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with negatif priority', (done) => {
            testCatchUpdate(done, id, newName, newDescription, newDifficulty, -2, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with invalid priority', (done) => {
            testCatchUpdate(done, id, newName, newDescription, newDifficulty, 5, id, name, description, difficulty, priority);
        });
        it('update a userstory', (done) => {
            backlogService.updateUserStory(id, newName, newDescription, newDifficulty, newPriority)
            .then((data) => {
                assert(!data.isNew);
                assert.deepStrictEqual(data._id, id);
                assert.deepStrictEqual(data.id, idUS);
                assert.deepStrictEqual(data.name, newName);
                assert.deepStrictEqual(data.description, newDescription);
                assert.deepStrictEqual(data.difficulty, newDifficulty);
                assert.deepStrictEqual(data.priority, newPriority);
                done();
            });
        });
    });

    describe('TTES-17 Remove UserStory', () => {
        const idA = 'MTES-01';
        const nameA = 'mochaUStestA';
        const descriptionA = 'Une description test A';
        let _id;

        beforeEach('add a userStory', async () => {
            let userstory = new UserStory({id: idA, name: nameA, description:descriptionA});
            await userstory.save();
            project.backlog.userStories.push(userstory);
            await project.save();
            _id = userstory._id;
        });

        it('delete the userStory', async () => {
            await backlogService.deleteUserStory(_id, project);
            const userstoryB = await UserStory.findById({_id:_id});
            assert.deepStrictEqual(backlog.userStories.length, 0);
            assert(!userstoryB);
        });
    });

    describe('TTES-26 Create Sprint', () => {
        const startDate = new Date('2020-11-19')
        const endDate = new Date('2020-11-30')

        it('cannot add an empty sprint', (done) => {
            testCatchAddSprint(done, null, null, null, null);
        });
        it('cannot add a sprint with no project', (done) => {
            testCatchAddSprint(done, null, name, startDate, endDate);
        });
        it('cannot add a sprint with no name', (done) => {
            testCatchAddSprint(done, project, null, startDate, endDate);
        });
        it('cannot add a sprint with no startDate', (done) => {
            testCatchAddSprint(done, project, name, null, endDate);
        });
        it('cannot add a sprint with no endDate', (done) => {
            testCatchAddSprint(done, project, name, startDate, null);
        });
        it('creates a sprint', (done) => {
            testThenAddSprint(done, project, name, startDate, endDate);
        });
    });

    describe('TTES-34 Get Backlog', () => {
        const backlog = new Backlog({sprints:[], userstories:[]});
        const project = new Project({ name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
        const idA = 'MTES-01';
        const idB = 'MTES-02';
        const nameA = 'mochaUStestA';
        const descriptionA = 'Une description test A';
        const nameB = 'mochaUStestB';
        const descriptionB = 'Une description test B';

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
