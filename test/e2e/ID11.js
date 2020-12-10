const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const assert = require('assert');
const {Builder} = require('selenium-webdriver');
require('../../src/app');

describe('ID11 E2E', () => {

    let driver;
    let project;
    let url;

    const name = 'First Task';
    const description = 'some description';
    const timeEstimation = '1.5';
    const userStoryId = 'GRE-01';

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await Project.deleteMany({});
        await UserStory.deleteMany({});
        const userStory = new UserStory({id: userStoryId, name: 'name', description: 'description'});
        await userStory.save();
        project = new Project({name: 'Green Project', key: 'GRE'});
        project.backlog.userStories.push(userStory);
        await project.save();
        url = 'http://localhost:8080/task?projectId='+project._id;
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
        // await checkProjectInList(key, name);
    });

    it('cancel the creation of a task', async () => {
        await driver.findElement(webdriver.By.id('rejectForm')).click();
        await driver.sleep(100);
        await checkUrl();
        // assert.deepStrictEqual(projectList.length, 0);
    });

    it('cannot add an task with missing parameters', async () => {
        // await driver.findElement(webdriver.By.id('key')).sendKeys(key);
        // await driver.findElement(webdriver.By.id('validForm')).click();
        // await checkErrorMessage('Champs manquant');
    });

    async function fillNewTaskForm() {
        await driver.findElement(webdriver.By.id('name')).sendKeys(name);
        await driver.findElement(webdriver.By.id('description')).sendKeys(description);
        await driver.findElement(webdriver.By.id('userStory')).sendKeys(userStoryId);
        await driver.findElement(webdriver.By.id('timeEstimation')).sendKeys(timeEstimation);
    }

    // eslint-disable-next-line no-unused-vars
    async function checkErrorMessage(message) {
        let errorMessage = await driver.findElement(webdriver.By.css('#message > div')).getText();
        assert.strictEqual(errorMessage, message);
    }

    async function checkUrl() {
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, url);
    }
});






