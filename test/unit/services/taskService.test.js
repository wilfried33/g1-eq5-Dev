const assert = require('assert');
const db = require('../../../config/db');
const backlogService = require('../../../src/services/backlogService');
const taskService = require('../../../src/services/taskService');
const Task = require('../../../src/models/task');
const Backlog = require('../../../src/models/backlog');
const Project = require('../../../src/models/project');
const Developer = require('../../../src/models/developer');

function testCatchAddTask(done, project, type, name, description, userStory, time, dependencies){
    taskService.addTask(project, type, name, description, userStory, time, dependencies)
        .catch(() => {
            Task.countDocuments((err, count) => {
                assert.deepStrictEqual(count, 0);
                done();
            });
        });
}

function testThenAddTask(done, project, type, name, description, userStory, time, dependencies){
    taskService.addTask(project, type, name, description, userStory, time, dependencies)
        .then((data) => {
            assert(!data.isNew);
            Task.countDocuments((err, count) => {
                assert.deepStrictEqual(count, 1);
                done();
            });
        });
}

function checkTask(actual, expected) {
    assert.deepStrictEqual(actual.name, expected.name);
    assert.deepStrictEqual(actual.description, expected.description);
    assert.deepStrictEqual(actual.userStoryID, expected.userStoryID);
    assert.deepStrictEqual(actual.timeEstimation, expected.timeEstimation);
    assert.strictEqual(actual.dependencies.toString(), expected.dependencies.toString());
}

function addDeveloperTask(task){
    return new Promise((resolve) => {
        const developer = new Developer({username: 'username'});
        developer.save().then(() => {
            task.assignee = developer;
            resolve(task.save());
        });
    });
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

        it('cannot add an empty task', (done) => {
            testCatchAddTask(done, null, null, null, null, null, null, null);
        });
        it('cannot add a task with no project', (done) => {
            testCatchAddTask(done, null, type, name, description, userStory, time, null);
        });
        it('cannot add a task with no type', (done) => {
            testCatchAddTask(done, project, null, name, description, userStory, time, null);
        });
        it('cannot add a task with no name', (done) => {
            testCatchAddTask(done, project, type, null, description, userStory, time, null);
        });
        it('cannot add a task with no userStory', (done) => {
            testThenAddTask(done, project, type, name, description, null, time, null);
        });
        it('creates a task with no time', (done) => {
            testThenAddTask(done, project, type, name, description, userStory, null, null);
        });
        it('creates a task with out description', (done) => {
            testThenAddTask(done, project, type, name, null, userStory, time, null);
        });
        it('creates a task', (done) => {
            testThenAddTask(done, project, type, name, description, userStory, time, null);
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


            it('cannot update a task with no _id', (done) => {
                taskService.updateTask(null, newName, newDescription, newUserStory, newTime, newDependencies)
                    .catch(() => {
                        Task.findById(task._id).then((savedTask) => {
                            checkTask(savedTask, expectedTask);
                            done();
                        });
                    });
            });

            it('cannot update a task with no name', (done) => {
                taskService.updateTask(task._id, null, newDescription, newUserStory, newTime, newDependencies)
                    .catch(() => {
                        Task.findById(task._id).then((savedTask) => {
                            checkTask(savedTask, expectedTask);
                            done();
                        });
                    });
            });

            it('cannot update a task that has a developer', (done) => {
                addDeveloperTask(task).then(() => {
                    taskService.updateTask(task._id, newName, newDescription, newUserStory, newTime, newDependencies)
                        .catch(() => {
                            Task.findById(task._id).then((savedTask) => {
                                checkTask(savedTask, expectedTask);
                                done();
                            });
                        });
                });
            });
        });

        describe('TTES-55 Delete Task', () => {

            it('delete a task', async () => {
                await taskService.deleteTask(project, task._id);
                const taskCount = await Task.countDocuments();
                assert.deepStrictEqual(taskCount, 0);
            });

            it('cannot delete a task without project', (done) => {
                taskService.deleteTask(null, task._id)
                    .catch(() =>
                        Task.countDocuments().then ((count) => {
                            assert.deepStrictEqual(count, 1);
                            done();
                        }));
            });

            it('cannot delete a task without id', (done) => {
                taskService.deleteTask(project, null)
                    .catch(() =>
                        Task.countDocuments().then ((count) => {
                            assert.deepStrictEqual(count, 1);
                            done();
                        }));
            });

            it('cannot delete a task that has a developer', (done) => {
                addDeveloperTask(task).then(() => {
                    taskService.deleteTask(project, task._id)
                        .catch(() =>
                            Task.countDocuments().then ((count) => {
                                assert.deepStrictEqual(count, 1);
                                done();
                            }));
                });
            });
        });

        describe('TTES-63 Update Task status', () => {

            const status = 1;
            const wrongStatus = 3;

            it('update a task', async () => {
                await taskService.updateTaskStatus(task._id, status);
                task = await Task.findById(task._id);
                assert.deepStrictEqual(task.status, status);
            });

            it('cannot update a task\'s status with no _id', (done) => {
                taskService.updateTaskStatus(null, status)
                    .catch(() => {
                        Task.findById(task._id).then((savedTask) => {
                            assert.deepStrictEqual(savedTask.status, 0);
                            done();
                        });
                    });
            });

            it('cannot update a task\'s status with a wrong value', (done) => {
                taskService.updateTaskStatus(task._id, wrongStatus)
                    .catch(() => {
                        Task.findById(task._id).then((savedTask) => {
                            assert.deepStrictEqual(savedTask.status, 0);
                            done();
                        });
                    });
            });
        });
    });
});
