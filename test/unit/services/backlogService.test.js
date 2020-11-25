process.env.NODE_ENV = 'test';

const assert = require('assert');
const backlogService = require('../../../src/services/backlogService');
const dbConfig = require('../../../config/db');
const UserStory = require('../../../src/models/userStory');
const Backlog = require('../../../src/models/backlog');
const Project = require('../../../src/models/project');
const Sprint = require('../../../src/models/sprint');

function testCatchAddUS(done, project, name, description){
    backlogService.addUserStory(project, name, description)
        .catch(() => {
            UserStory.countDocuments((err, count) => {
                assert.deepStrictEqual(count, 0);
                done();
            });
        });
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

function testCatchUpdateUS(done, id, name, description, difficulty, priority, objId, objName, objDescription, objDifficulty, objPriority){
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
            });
        });
}

function testCatchUpdateSprint(done, id, name, objId, objName){
    backlogService.updateSprint(id, name)
        .then(value => assert(value))
        .catch(() => {
            Sprint.findById(objId)
                .then((p) => {
                    assert.deepStrictEqual(p._id, objId);
                    assert.deepStrictEqual(p.name, objName);
                    done();
                });
        });
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
        await UserStory.deleteMany({});
        await Sprint.deleteMany({});
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
        const idUS = 'PAC-01';
        const newName = 'mochaUStest BIS';
        const newDescription = 'Une description test BIS';
        const newDifficulty = 5;
        const newPriority = 3;

        beforeEach('create a userStory',  async () => {
            let userstory = new UserStory({id:idUS, name: name, description: description});
            await userstory.save();
            id = userstory._id;
            difficulty = userstory.difficulty;
            priority = userstory.priority;
        });

        it('cannot update with empty values', (done) => {
            testCatchUpdateUS(done, null, null, null, null, null, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no id', (done) => {
            testCatchUpdateUS(done, null, newName, newDescription, newDifficulty, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no name', (done) => {
            testCatchUpdateUS(done, id, null, newDescription, newDifficulty, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no difficulty', (done) => {
            testCatchUpdateUS(done, id, name, newDescription, null, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with no priority', (done) => {
            testCatchUpdateUS(done, id, name, newDescription, newDifficulty, null, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with invalid id', (done) => {
            testCatchUpdateUS(done, 'iybefbyvbuyb', newName, newDescription, newDifficulty, newPriority, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with negatif priority', (done) => {
            testCatchUpdateUS(done, id, newName, newDescription, newDifficulty, -2, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with invalid priority', (done) => {
            testCatchUpdateUS(done, id, newName, newDescription, newDifficulty, 5, id, name, description, difficulty, priority);
        });
        it('cannot update a userstory with task', (done) => {
            UserStory.findOneAndUpdate({_id: id}, {taskCount: 1}, {
                new: true,
                useFindAndModify: false
            }).then(() => 
                testCatchUpdateUS(done, id, newName, newDescription, newDifficulty, newPriority, id, name, description, difficulty, priority)
            );

            
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

        it('cannot delete the userStory width task', async () => {
            await UserStory.findOneAndUpdate({_id: _id}, {taskCount: 1}, {
                new: true,
                useFindAndModify: false
            });

            backlogService.deleteUserStory(_id, project).catch(async () => {
                const userstoryB = await UserStory.findById({_id:_id});
                assert.deepStrictEqual(backlog.userStories.length, 1);
                assert(userstoryB);
            });
            
        });

        it('cannot delete the userStory width wrond userStory id', async () => {
            backlogService.deleteUserStory('osdinbonborn', project).catch(async () => {
                const userstoryB = await UserStory.findById({_id:_id});
                assert.deepStrictEqual(backlog.userStories.length, 1);
                assert(userstoryB);
            });
        });
    });

    describe('TTES-26 Create Sprint', () => {
        const startDate ='2020-11-19';
        const endDate = '2020-11-30';

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
        it('cannot add a sprint with invalid startDate', (done) => {
            testCatchAddSprint(done, project, name, 'zegzEG', endDate);
        });
        it('cannot add a sprint with invalid endDate', (done) => {
            testCatchAddSprint(done, project, name, startDate, 'szegeg');
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

    describe('TTES-21 Set US\'s sprint', () => {
        const id = 'MTES-01';
        const name = 'mochaUSTestName';
        const description = 'Une description test';
        let sprintID;
        let _id;

        describe('User story in backlog', () => {
            let backlog, project;
            beforeEach('add a userStory', async () => {
                await Project.deleteMany({});
                backlog = new Backlog({sprints: [], userstories: []});
                project = new Project({name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
                let userStory = new UserStory({id: id, name: name, description: description});
                await userStory.save();
                _id = userStory._id;
                project.backlog.userStories.push(userStory);
                let sprint = new Sprint({name: 'sprint1', startDate: '2020-12-09', endDate: '2020-12-23'});
                await sprint.save();
                project.backlog.sprints.push(sprint);
                sprintID = sprint._id;
                await project.save();
            });

            it('set userStory sprint', async () => {
                await backlogService.setUSSprint(project, _id, sprintID);
                const userStory = await backlogService.getUserStory(_id);
                assert.strictEqual(userStory.sprint.toString(), sprintID.toString());
            });

            it('cannot set userStory sprint with wrong id', (done) => {
                backlogService.setUSSprint(project, '-1', sprintID)
                    .catch(() => {
                        assert.deepStrictEqual(project.backlog.userStories.length, 1);
                        done();
                    });
            });

            it('cannot set userStory sprint with wrong sprint id', (done) => {
                backlogService.setUSSprint(project, _id, '-1')
                    .catch(() => {
                        assert.deepStrictEqual(project.backlog.userStories.length, 1);
                        done();
                    });
            });
        });

    });

    describe('TTES-29 Update Sprint', () => {
        let sprintId;
        const startDate ='2020-11-19';
        const endDate = '2020-11-30';
        const newName = 'mochaUStest BIS';

        beforeEach('create a Sprint',  async () => {
            let sprint = new Sprint({name: name, startDate:startDate, endDate:endDate});
            await sprint.save();
            sprintId = sprint._id;
        });

        it('cannot update with empty values', (done) => {
            testCatchUpdateSprint(done, null, null, sprintId, name);
        });
        it('cannot update a sprint with no id', (done) => {
            testCatchUpdateSprint(done, null, newName, sprintId, name);
        });
        it('cannot update a sprint with no name', (done) => {
            testCatchUpdateSprint(done, sprintId, null, sprintId, name);
        });
        it('update a userstory', (done) => {
            backlogService.updateSprint(sprintId, newName)
                .then((data) => {
                    assert(!data.isNew);
                    assert.deepStrictEqual(data._id, sprintId);
                    assert.deepStrictEqual(data.name, newName);
                    done();
                });
        });
    });

    describe('TTES-17 Remove Sprint', () => {
        const idA = 'MTES-01';
        const nameA = 'mochaUStestA';
        const descriptionA = 'Une description test A';
        const nameB = 'sprint A';
        const startDate = '11-02-20';
        const endDate = '02-20-20';
        let project;
        let _id;

        beforeEach('add a sprint', async () => {
            await Project.deleteMany();
            let sprint = new Sprint({name:nameB, startDate:startDate, endDate:endDate});
            await sprint.save();
            const backlog = new Backlog({sprints: [], userstories: []});
            project = new Project({name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
            project.backlog.sprints.push(sprint._id);
            await project.save();
            _id = sprint._id;
        });

        it('cannot delete the sprint width userStory', async () => {
            let userstory = new UserStory({id: idA, name: nameA, description:descriptionA, sprint:_id});
            await userstory.save();

            backlogService.deleteSprint(_id, project).catch(async () => {
                const sprint = await Sprint.findById({_id:_id});
                assert(sprint);
                assert.deepStrictEqual(backlog.sprints.length, 1);
            });
        });

        it('delete the userStory', async () => {
            backlogService.deleteSprint(_id, project).then(async () => {
                const sprint = await Sprint.findById({_id:_id});
                assert(!sprint);
                assert.deepStrictEqual(backlog.sprints.length, 0);
            });
        });
    });
});
