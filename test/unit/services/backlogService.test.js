const assert = require('assert');
const backlogService = require('../../../src/services/backlogService');
const db = require('../../../config/db');
const UserStory = require('../../../src/models/userStory');
const Backlog = require('../../../src/models/backlog');
const Project = require('../../../src/models/project');
const Sprint = require('../../../src/models/sprint');

describe('Backlogs service', () => {
    const backlog = new Backlog({sprints:[], userStories:[]});
    const name = 'mochaUStest';
    const description = 'Une description test';
    let project;

    async function testCatchAddUS(project, name, description){
        try {
            await backlogService.addUserStory(project, name, description);
        } catch (error) {
            const count = await UserStory.countDocuments();
            assert.deepStrictEqual(count, 0);
            return;
        }
        assert(false);
    }

    async function testThenAddUS(project, name, description){
        const data = await backlogService.addUserStory(project, name, description);
        assert(!data.isNew);
        const count = await UserStory.countDocuments();
        assert.deepStrictEqual(count, 1);
    }

    before('connect', function(){
        db.connectToDB();
    });

    beforeEach('empty db', async () => {
        await db.emptyCollections();
        project = new Project({ name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
        await project.save();
    });

    describe('TTES-11 Create UserStory', () => {

        it('cannot add an empty userStory', async () => {
            await testCatchAddUS(null, null, null);
        });
        it('cannot add a userStory with no project', async () => {
            await testCatchAddUS(null, name, description);
        });
        it('cannot add a userStory with no name', async () => {
            await testCatchAddUS(project, null, description);
        });
        it('creates a userStory with out description', async () => {
            await testThenAddUS(project, name, null);
        });
        it('creates a userStory', async () => {
            await testThenAddUS(project, name, description);
        });
    });

    describe('TTES-14 Update UserStory', () => {
        let id;
        let difficulty;
        let priority;
        const idUS = 'PAC-01';
        const newObjectif = {
            name: 'mochaUStest BIS',
            description: 'Une description test BIS',
            difficulty: 5,
            priority: 3
        };
        let objectif;

        async function testCatchUpdateUS(id, name, description, difficulty, priority, objectif){
            try {
                await backlogService.updateUserStory(id, name, description, difficulty, priority);
            } catch (error) {
                const p = await UserStory.findById(objectif._id);
                assert.deepStrictEqual(p._id, objectif._id);
                assert.deepStrictEqual(p.name, objectif.name);
                assert.deepStrictEqual(p.description, objectif.description);
                assert.deepStrictEqual(p.difficulty, objectif.difficulty);
                assert.deepStrictEqual(p.priority, objectif.priority);
                return;
            }
            assert(false);
        }

        beforeEach('create a userStory', async () => {
            let userstory = new UserStory({id:idUS, name: name, description: description});
            await userstory.save();
            id = userstory._id;
            difficulty = userstory.difficulty;
            priority = userstory.priority;

            objectif= {
                _id: id,
                name: name,
                description: description,
                difficulty: difficulty,
                priority: priority
            };
        });

        it('cannot update with empty values', async () => {
            await testCatchUpdateUS(null, null, null, null, null, objectif);
        });
        it('cannot update a userstory with no id', async () => {
            await testCatchUpdateUS(null, newObjectif.name, newObjectif.description, newObjectif.difficulty, newObjectif.priority, objectif);
        });
        it('cannot update a userstory with no name', async () => {
            await testCatchUpdateUS(id, null, newObjectif.description, newObjectif.difficulty, newObjectif.priority, objectif);
        });
        it('cannot update a userstory with no difficulty', async () => {
            await testCatchUpdateUS(id, name, newObjectif.description, null, newObjectif.priority, objectif);
        });
        it('cannot update a userstory with no priority', async () => {
            await testCatchUpdateUS(id, name, newObjectif.description, newObjectif.difficulty, null, objectif);
        });
        it('cannot update a userstory with invalid id', async () => {
            await testCatchUpdateUS('iybefbyvbuyb', newObjectif.name, newObjectif.description, newObjectif.difficulty, newObjectif.priority, objectif);
        });
        it('cannot update a userstory with negatif priority', async () => {
            await testCatchUpdateUS(id, newObjectif.name, newObjectif.description, newObjectif.difficulty, -2, objectif);
        });
        it('cannot update a userstory with invalid priority', async () => {
            await testCatchUpdateUS(id, newObjectif.name, newObjectif.description, newObjectif.difficulty, 5, objectif);
        });
        it('cannot update a userstory with task', async () => {
            await UserStory.findOneAndUpdate({_id: id}, {taskCount: 1}, {
                new: true,
                useFindAndModify: false
            });
            await testCatchUpdateUS(id, newObjectif.name, newObjectif.description, newObjectif.difficulty, newObjectif.priority, objectif);


        });
        it('update a userstory', async () => {
            const data = await backlogService.updateUserStory(id, newObjectif.name, newObjectif.description, newObjectif.difficulty, newObjectif.priority);
            assert(!data.isNew);
            assert.deepStrictEqual(data._id, id);
            assert.deepStrictEqual(data.id, idUS);
            assert.deepStrictEqual(data.name, newObjectif.name);
            assert.deepStrictEqual(data.description, newObjectif.description);
            assert.deepStrictEqual(data.difficulty, newObjectif.difficulty);
            assert.deepStrictEqual(data.priority, newObjectif.priority);
        });
    });

    describe('TTES-17 Remove UserStory', () => {
        const idA = 'MTES-01';
        const nameA = 'mochaUStestA';
        const descriptionA = 'Une description test A';
        let _id;

        async function testCatchDeleteUS(project, _id, objId){
            try {
                await backlogService.deleteUserStory(_id, project);
            } catch (error) {
                const userstoryB = await UserStory.findById({_id:objId});
                assert.deepStrictEqual(project.backlog.userStories.length, 1);
                assert(userstoryB);
                return;
            }
            assert(false);
        }

        before('connect', function(){
            db.connectToDB();
        });

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

        it('cannot delete the userStory with task', async () => {
            await UserStory.findOneAndUpdate({_id: _id}, {taskCount: 1}, {
                new: true,
                useFindAndModify: false
            });
            await testCatchDeleteUS(project, _id, _id);
        });

        it('cannot delete the userStory width wrond userStory id', async () => {
            await testCatchDeleteUS(project, 'oizebvoezbv', _id);
        });
    });

    describe('TTES-26 Create Sprint', () => {
        const startDate ='2020-11-19';
        const endDate = '2020-11-30';
        
        async function testCatchAddSprint(project, name, startDate, endDate){
            try {
                await backlogService.addSprint(project, name, startDate, endDate);
            } catch (error) {
                const count = await Sprint.countDocuments();
                assert.deepStrictEqual(count, 0);
                return;
            }
            assert(false);
        }

        async function testThenAddSprint(project, name, startDate, endDate){
            const data = await backlogService.addSprint(project, name, startDate, endDate);
            assert(!data.isNew);
            const count = await Sprint.countDocuments();
            assert.deepStrictEqual(count, 1);
        }

        it('cannot add an empty sprint', async () => {
            await testCatchAddSprint(null, null, null, null);
        });
        it('cannot add a sprint with no project', async () => {
            await testCatchAddSprint(null, name, startDate, endDate);
        });
        it('cannot add a sprint with no name', async () => {
            await testCatchAddSprint(project, null, startDate, endDate);
        });
        it('cannot add a sprint with no startDate', async () => {
            await testCatchAddSprint(project, name, null, endDate);
        });
        it('cannot add a sprint with no endDate', async () => {
            await testCatchAddSprint(project, name, startDate, null);
        });
        it('cannot add a sprint with invalid startDate', async () => {
            await testCatchAddSprint(project, name, 'zegzEG', endDate);
        });
        it('cannot add a sprint with invalid endDate', async () => {
            await testCatchAddSprint(project, name, startDate, 'szegeg');
        });
        it('creates a sprint', async () => {
            await testThenAddSprint(project, name, startDate, endDate);
        });
    });

    describe('TTES-34 Get Backlog', () => {
        const idA = 'MTES-01';
        const idB = 'MTES-02';
        const nameA = 'mochaUStestA';
        const descriptionA = 'Une description test A';
        const nameB = 'mochaUStestB';
        const descriptionB = 'Une description test B';

        beforeEach('add a userStory', async () => {
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

    describe('TTES-48 Get US by difficulty', () => {
        const us1 = {id: 'MTES-01', name: 'mochaUStest1', description: 'test 1', difficulty: 3 };
        const us2 = {id: 'MTES-02', name: 'mochaUStest2', description: 'test 2', difficulty: 1 };
        const us3 = {id: 'MTES-03', name: 'mochaUStest3', description: 'test 3', difficulty: 3 };
        const usersStories = [us1, us2, us3];

        beforeEach('add userStories', async () => {
            for (const us of usersStories) {
                const dbUS = await new UserStory(us).save();
                project.backlog.userStories.push(dbUS);
            }
            await project.save();
        });

        it('return the userStories', async () => {
            let userStoriesArray = await backlogService.getUSByDifficulty(project);
            assert.deepStrictEqual(userStoriesArray.length, 2);
            assert.deepStrictEqual(userStoriesArray[0].difficulty, 1);
            assert.deepStrictEqual(userStoriesArray[0].userStories.length, 1);
            assert.deepStrictEqual(userStoriesArray[1].difficulty, 3);
            assert.deepStrictEqual(userStoriesArray[1].userStories.length, 2);
        });
    });

    describe('TTES-21 Set US\'s sprint', () => {
        const id = 'MTES-01';
        const name = 'mochaUSTestName';
        const description = 'Une description test';
        let sprintID;
        let _id;

        async function testCatchUSSprint(project, us, sprintID){
            try {
                await backlogService.setUSSprint(project, us, sprintID);
            } catch (error) {
                assert.deepStrictEqual(project.backlog.userStories.length, 1);
                return;
            }
            assert(false);
        }

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

            it('set userStory in sprint', async () => {
                await backlogService.setUSSprint(project, _id, sprintID);
                const userStory = await backlogService.getUserStory(_id);
                assert.strictEqual(userStory.sprint.toString(), sprintID.toString());
            });

            it('cannot set userStory sprint with wrong id', async () => {
                await testCatchUSSprint(project, '-1', sprintID);
            });

            it('cannot set userStory sprint with wrong sprint id', async () => {
                await testCatchUSSprint(project, _id, '-1');
            });
        });

    });

    describe('TTES-29 Update Sprint', () => {
        let sprintId;
        const startDate ='2020-11-19';
        const endDate = '2020-11-30';
        const newName = 'mochaUStest BIS';

        async function testCatchUpdateSprint(id, name, objId, objName){
            try {
                await backlogService.updateSprint(id, name);
            } catch (error) {
                const p = await Sprint.findById(objId);
                assert.deepStrictEqual(p._id, objId);
                assert.deepStrictEqual(p.name, objName);
                return;
            }
            assert(false);
        }

        beforeEach('create a Sprint', async () => {
            let sprint = new Sprint({name: name, startDate:startDate, endDate:endDate});
            await sprint.save();
            sprintId = sprint._id;
        });

        it('cannot update with empty values', async () => {
            await testCatchUpdateSprint(null, null, sprintId, name);
        });
        it('cannot update a sprint with no id', async () => {
            await testCatchUpdateSprint(null, newName, sprintId, name);
        });
        it('cannot update a sprint with no name', async () => {
            await testCatchUpdateSprint(sprintId, null, sprintId, name);
        });
        it('update a userstory', async () => {
            const data = await backlogService.updateSprint(sprintId, newName);
            assert(!data.isNew);
            assert.deepStrictEqual(data._id, sprintId);
            assert.deepStrictEqual(data.name, newName);
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

        it('cannot delete the sprint with userStory', async () => {
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
