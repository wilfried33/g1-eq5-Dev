const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const assert = require('assert');
const db = require('../../config/db');
const {Builder} = require('selenium-webdriver');
require('../../src/app');

describe('ID11 E2E', () => {

    let driver;
    let project;
    let url;

    const name = 'First Task';
    const description = 'some description';
    const timeEstimation = '3';
    const userStoryId = 'GRE-01';
    const userStoryName = 'name';

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await db.emptyCollections();
        const userStory = new UserStory({id: userStoryId, name: userStoryName, description: 'description'});
        await userStory.save();
        project = new Project({name: 'Green Project', key: 'GRE'});
        project.backlog.userStories.push(userStory);
        await project.save();
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
        url = 'http://localhost:8080/task';
        await driver.get(url);
        await driver.findElement(webdriver.By.css('#addTaskButton')).click();
        await driver.sleep(100);
    });

    after(async () => {
        await driver.quit();
    });


    it('add a task', async () => {
        await fillNewTaskForm();
        await driver.findElement(webdriver.By.id('validForm')).click();
        await checkUrl();
        let tasksList = await driver.findElements(webdriver.By.className('task'));
        let foundTask = tasksList.find(async task => {
            let nameDiv = await task.findElement(webdriver.By.css('.elements > :nth-child(2)'));
            nameDiv.getText() === name;
        });
        assert(foundTask, 'task not found');
    });

    it('cancel the creation of a task', async () => {
        await driver.findElement(webdriver.By.id('rejectForm')).click();
        await checkUrl();
        let tasksList = await driver.findElements(webdriver.By.className('task'));
        assert.deepStrictEqual(tasksList.length, 0);
    });

    it('cannot add a task with missing parameters', async () => {
        await driver.findElement(webdriver.By.id('validForm')).click();
        await checkErrorMessage('Paramètre manquant ou incompatible');
    });

    async function fillNewTaskForm() {
        await driver.findElement(webdriver.By.id('name')).sendKeys(name);
        await driver.findElement(webdriver.By.id('description')).sendKeys(description);
        await driver.findElement(webdriver.By.id('userStory')).sendKeys(userStoryId);
        await driver.findElement(webdriver.By.id('timeEstimation')).sendKeys(timeEstimation);
    }

    async function checkErrorMessage(message) {
        await driver.sleep(300);
        const locator = await driver.findElement(webdriver.By.css('#message > div'));
        let errorMessage = await locator.getText();
        assert.strictEqual(errorMessage, message);
    }

    async function checkUrl() {
        await driver.sleep(300);
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, url);
    }
});






