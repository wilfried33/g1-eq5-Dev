const webdriver = require('selenium-webdriver');
const projectService = require('../../src/services/projectService');
const backlogService = require('../../src/services/backlogService');
const taskService = require('../../src/services/taskService');
const db = require('../../config/db');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');



describe('ID45 E2E test', () => {
    let driver;
    const task = {
        type: 1,
        name: 'First Task',
        description: 'Some task description'
    };

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async() => {
        await db.emptyCollections();
        const project = await projectService.addProject('Blue Project', 'BLU');
        const userStory = await backlogService.addUserStory(project, 'First US', 'some US description');
        await taskService.addTask(project, task.type, task.name, task.description, userStory);
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
    });

    after(async () => {
        await driver.quit();
    });

    it('view tasks', async () => {
        await driver.get('http://localhost:8080/task');
        let registeredId = await driver.findElement(webdriver.By.css('.kanban #todo .task-list > div > div > div:nth-child(1) > div')).getText();
        let registeredName = await driver.findElement(webdriver.By.css('.kanban #todo .task-list > div:nth-child(2) .text')).getText();
        assert.deepStrictEqual(registeredId, 'TTES-1');
        assert.deepStrictEqual(registeredName, task.name);
    });
});









