process.env.NODE_ENV = 'test';

const assert = require('assert');
const backlogService = require('../../../src/services/backlogService');
const dbConfig = require('../../../config/db');
const Task = require('../../../src/models/task');
const Backlog = require('../../../src/models/backlog');
const Project = require('../../../src/models/project');
const UserStory = require('../../../src/models/userStory');
const taskService = require('../../../src/services/taskService');

function testCatchAddTask(done, project, name, description, userStory, time, dependency){
    taskService.addTask(project, name, description, userStory, time, dependency)
        .catch(() => {
            Task.countDocuments((err, count) => {
                assert.deepStrictEqual(count, 0);
                done();
            });
        });
}

function testThenAddTask(done, project, name, description, userStory, time, dependency){
    taskService.addTask(project, name, description, userStory, time, dependency)
        .then((data) => {
            assert(!data.isNew);
            Task.countDocuments((err, count) => {
                assert.deepStrictEqual(count, 1);
                done();
            });
        });
}

describe('Tasks service', () => {
    const backlog = new Backlog({sprints:[], userStories:[]});
    const project = new Project({ name: 'mochatest', key: 'MTES', backlog: backlog, tasks: []});
    const name = 'mochaUStest';
    const description = 'Une description test';
    const userStory = new UserStory({id:"TGD-10", name: 'mochaUStest', description: 'Une description test'});
    const time = 1
    const dependency = ""

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', async () => {
        await Task.deleteMany({});
    });

    describe('TTES-11 Create Task', () => {

        it('cannot add an empty task', (done) => {
            testCatchAddTask(done, null, null, null, null, null, null);
        });
        it('cannot add a task with no project', (done) => {
            testCatchAddTask(done, null, name, description, userStory, time, null);
        });
        it('cannot add a task with no name', (done) => {
            testCatchAddTask(done, project, null, description, userStory, time, null);
        });
        it('cannot add a task with no userStory', (done) => {
            testCatchAddTask(done, project, null, description, null, time, null);
        });
        it('cannot add a task with no time', (done) => {
            testCatchAddTask(done, project, null, description, userStory, null, null);
        });
        it('creates a task with out description', (done) => {
            testThenAddTask(done, project, name, null, userStory, time, null);
        });
        it('creates a task', (done) => {
            testThenAddTask(done, project, name, description, userStory, time, null);
        });
    });
});