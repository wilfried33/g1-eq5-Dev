const assert = require('assert');
const db = require('../../../config/db');
const backlogService = require('../../../src/services/backlogService');
const taskService = require('../../../src/services/taskService');
const Task = require('../../../src/models/task');
const Backlog = require('../../../src/models/backlog');
const Project = require('../../../src/models/project');
const Developer = require('../../../src/models/developer');

async function addDeveloperTask(task){
    const developer = new Developer({username: 'username'});
    await developer.save();
    task.assignee = developer;
    await task.save();
}

describe('Tasks service', () => {
    const type = 2;
    const backlog = new Backlog({sprints:[], userStories:[]});
    const name = 'mochaTasktest';
    const description = 'Une description test';
    const time = 1;
    const dependencies = [];

    const expectedTask = {
        name: name,
        description: description,
        timeEstimation: time,
        userStoryID: '',
        dependencies: dependencies
    };

    let project;
    let userStory;

    function checkTask(actual, expected) {
        assert.deepStrictEqual(actual.name, expected.name);
        assert.deepStrictEqual(actual.description, expected.description);
        assert.deepStrictEqual(actual.userStoryID, expected.userStoryID);
        assert.deepStrictEqual(actual.timeEstimation, expected.timeEstimation);
        assert.strictEqual(actual.dependencies.toString(), expected.dependencies.toString());
    }

    before('connect', function(){
        db.connectToDB();
    });

    beforeEach('empty db', async () => {
        await db.emptyCollections();

        project = new Project({ name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
        await project.save();
        userStory = await backlogService.addUserStory(project, 'first US');
        expectedTask.userStoryID = userStory._id;
    });

    describe('TTES-39 Create Task', () => {
        async function testCatchAddTask(project, type, name, description, userStory, time, dependencies){
            try {
                await taskService.addTask(project, type, name, description, userStory, time, dependencies);
            } catch (error) {
                const count = await Task.countDocuments();
                assert.deepStrictEqual(count, 0); 
                return;
            }
            assert(false);
        }
        
        async function testThenAddTask(project, type, name, description, userStory, time, dependencies){
            const data = await taskService.addTask(project, type, name, description, userStory, time, dependencies);
            assert(!data.isNew);
            const count = await Task.countDocuments();
            assert.deepStrictEqual(count, 1);
        }

        it('cannot add an empty task', async () => {
            await testCatchAddTask(null, null, null, null, null, null, null);
        });
        it('cannot add a task with no project', async () => {
            await testCatchAddTask(null, type, name, description, userStory, time, null);
        });
        it('cannot add a task with no type', async () => {
            await testCatchAddTask(project, null, name, description, userStory, time, null);
        });
        it('cannot add a task with no name', async () => {
            await testCatchAddTask(project, type, null, description, userStory, time, null);
        });
        it('cannot add a task with no userStory', async () => {
            await testThenAddTask(project, type, name, description, null, time, null);
        });
        it('creates a task with no time', async () => {
            await testThenAddTask(project, type, name, description, userStory, null, null);
        });
        it('creates a task with out description', async () => {
            await testThenAddTask(project, type, name, null, userStory, time, null);
        });
        it('creates a task', async () => {
            await testThenAddTask(project, type, name, description, userStory, time, null);
        });
    });

    describe('Tests needing existing task', () => {
        let task;
        let newUserStory;

        beforeEach('Add existing task', async () => {
            task = await taskService.addTask(project, type, name, description, userStory, time);
            newUserStory = await backlogService.addUserStory(project, 'new US');
        });

        describe('TTES-55 Update Task', () => {
            let newName = 'newName';
            const newDescription = 'new description test';
            const newTime = 2;
            let newDependencies = [];

            async function testCatchUpdateTask(id, name, description, userStory, time, dependencies){
                try {
                    await taskService.updateTask(id, name, description, userStory, time, dependencies);
                } catch (error) {
                    const savedTask = await Task.findById(task._id);
                    checkTask(savedTask, expectedTask);
                    return;
                }
                assert(false);
            }

            beforeEach('Add existing task', async () => {
                task = await taskService.addTask(project, type, name, description, userStory, time);
                newUserStory = await backlogService.addUserStory(project, 'new US');
                const dependenciesTask = await taskService.addTask(project, type, name, description, userStory, time);
                newDependencies.push(dependenciesTask._id);
            });

            it('update a task', async () => {
                await taskService.updateTask(task._id, newName, newDescription, newUserStory, newTime, newDependencies);
                task = await Task.findById(task._id);
                const expected = {
                    name: newName,
                    description: newDescription,
                    timeEstimation: newTime,
                    userStoryID: newUserStory._id,
                    dependencies: newDependencies
                };
                checkTask(task, expected);
            });


            it('cannot update a task with no _id', async () => {
                await testCatchUpdateTask(null, newName, newDescription, newUserStory, newTime, newDependencies);
            });

            it('cannot update a task with no name', async () => {
                await testCatchUpdateTask(task._id, null, newDescription, newUserStory, newTime, newDependencies);
            });

            it('cannot update a task that has a developer', async () => {
                await addDeveloperTask(task);
                await testCatchUpdateTask(task._id, newName, newDescription, newUserStory, newTime, newDependencies);
            });
        });

        describe('TTES-55 Delete Task', () => {
            async function testCatchDeleteTask(project, id){
                try {
                    await taskService.deleteTask(project, id);
                } catch (error) {
                    const count = await Task.countDocuments();
                    assert.deepStrictEqual(count, 1);
                    return;
                }
                assert(false);
            }

            it('delete a task', async () => {
                await taskService.deleteTask(project, task._id);
                const taskCount = await Task.countDocuments();
                assert.deepStrictEqual(taskCount, 0);
            });

            it('cannot delete a task without project', async () => {
                await testCatchDeleteTask(null, task._id);
            });

            it('cannot delete a task without id', async () => {
                await testCatchDeleteTask(project, null);
            });

            it('cannot delete a task that has a developer', async () => {
                await addDeveloperTask(task);
                await testCatchDeleteTask(project, task._id);
            });
        });

        describe('TTES-63 Update Task status', () => {

            const status = 1;
            const wrongStatus = 3;

            async function testCatchUpdateStatus(id, status){
                try {
                    await taskService.updateTaskStatus(id, status);
                } catch (error) {
                    const savedTask = await Task.findById(task._id);
                    assert.deepStrictEqual(savedTask.status, 0);
                    return;
                }
                assert(false);
            }

            it('update a task', async () => {
                await taskService.updateTaskStatus(task._id, status);
                task = await Task.findById(task._id);
                assert.deepStrictEqual(task.status, status);
            });

            it('cannot update a task\'s status with no _id', async () => {
                await testCatchUpdateStatus(null, status);
            });

            it('cannot update a task\'s status with a wrong value', async () => {
                await testCatchUpdateStatus(task._id, wrongStatus);
            });
        });
    });
});
