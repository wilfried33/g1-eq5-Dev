const webdriver = require('selenium-webdriver');
const projectService = require('../../src/services/projectService');
const backlogService = require('../../src/services/backlogService');
const developerService = require('../../src/services/developerService');
const taskService = require('../../src/services/taskService');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');
const db = require('../../config/db');



describe('ID12 E2E test', () => {
    let driver;
    let url;
    let userStory;
    let taskId;
    const task = {
        type: 1,
        name: 'First Task',
        description: 'Some task description'
    };

    const updatedTask = {
        name: 'First Task bis',
        description: 'Some other task description'
    };

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await db.emptyCollections();
        const project = await projectService.addProject('Blue Project', 'BLU');
        userStory = await backlogService.addUserStory(project, 'First US', 'some US description');
        const t = await taskService.addTask(project, task.type, task.name, task.description, userStory);
        taskId = t._id;
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
        url = 'http://localhost:8080/task';
        await driver.get(url);
    });

    after(async () => {
        await driver.quit();
    });


    it('delete a task', async () => {
        let tasks = await driver.findElements(webdriver.By.css('.task'));
        assert.deepStrictEqual(tasks.length, 1);
        await driver.findElement(webdriver.By.css('.task > div > div:nth-child(6) > div.d-flex > button:nth-child(2)')).click();
        await driver.sleep(100);
        tasks = await driver.findElements(webdriver.By.css('.task'));
        assert.deepStrictEqual(tasks.length, 0);
        await checkUrl();
    });
    it('update a task', async () => {
        await driver.findElement(webdriver.By.css('.task > div > div:nth-child(6) > div.d-flex > button:nth-child(1)')).click();
        await driver.findElement(webdriver.By.css('#name')).clear();
        await driver.findElement(webdriver.By.css('#name')).sendKeys(updatedTask.name);
        await driver.findElement(webdriver.By.css('#description')).clear();
        await driver.findElement(webdriver.By.css('#description')).sendKeys(updatedTask.description);
        await driver.findElement(webdriver.By.css('#validForm')).click();
        await checkUrl();
        await driver.sleep(100);
        let taskName = await driver.findElement(webdriver.By.css('.task > div > div.flex-grow-1.text')).getText();
        assert.deepStrictEqual(taskName, updatedTask.name);
    });

    it('cancel task update', async () => {
        await driver.findElement(webdriver.By.css('.task > div > div:nth-child(6) > div.d-flex > button:nth-child(1)')).click();
        await driver.findElement(webdriver.By.css('#rejectForm')).click();
        await checkUrl();
        let taskName = await driver.findElement(webdriver.By.css('.task > div > div.flex-grow-1.text')).getText();
        assert.deepStrictEqual(taskName, task.name);
    });

    it('cannot update a task with missing parameters', async () => {
        await driver.findElement(webdriver.By.css('.task > div > div:nth-child(6) > div.d-flex > button:nth-child(1)')).click();
        await driver.findElement(webdriver.By.css('#name')).clear();
        await driver.findElement(webdriver.By.css('#validForm')).click();
        await checkUrl();
        let taskName = await driver.findElement(webdriver.By.css('.task > div > div.flex-grow-1.text')).getText();
        assert.deepStrictEqual(taskName, task.name);
        await checkErrorMessage('Paramètre manquant ou incompatible');
    });


    describe('Tasks containing developers', () => {

        beforeEach(async () => {
            const dev = await developerService.addDeveloper('username');
            await taskService.updateTaskDeveloper(taskId, dev);
            await driver.get(url);
        });

        it('cannot delete a task', async () => {
            const deleteButtonVisibility = await driver.findElement(webdriver.By.css('.task > div > div:nth-child(6) > div.d-flex > button:nth-child(2)'))
                .getCssValue( 'visibility' );
            assert.deepStrictEqual(deleteButtonVisibility, 'hidden');
        });
    });

    async function checkErrorMessage(message) {
        let errorMessage = await driver.findElement(webdriver.By.css('#message > div')).getText();
        assert.strictEqual(errorMessage, message);
    }

    async function checkUrl() {
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, url);
    }
});











