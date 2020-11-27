process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const Sprint = require('../../src/models/sprint');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');



describe('ID07 E2E test', () => {
    let driver;
    let sprint;
    let project;
    let url;
    const name = 'Sprint 1';
    const newName = 'Sprint 1 : search bar';

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await Project.deleteMany({});
        await Sprint.deleteMany({});
        sprint = new Sprint({name: name, startDate: '2020-01-12', endDate: '2020-01-19'});
        await sprint.save();
        project = new Project({name: 'Purple Project', key: 'PUR'});
        project.backlog.sprints.push(sprint);
        await project.save();
        url = 'http://localhost:8080/backlog?projectId='+project._id;
        await driver.get(url);
    });

    after(async () => {
        await driver.quit();
    });


    it('delete a sprint', async () => {
        await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > button:nth-child(4)')).click();
        await driver.sleep(1000);
        let sprints = await driver.findElements(webdriver.By.css('body > div:nth-child(5) > div.title > div:nth-child(1)'));
        assert.deepStrictEqual(sprints.length, 0);
        await checkUrl();
    });

    it('update a sprint', async () => {
        await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > button:nth-child(3)')).click();
        await updateSprint(newName);
        let sprintName = await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > div:nth-child(1)')).getText();
        assert.deepStrictEqual(sprintName, newName);
        await checkUrl();
    });

    it('cancel sprint update', async () => {
        await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > button:nth-child(3)')).click();
        await driver.findElement(webdriver.By.css('#rejectFormSprint')).click();
        let sprintName = await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > div:nth-child(1)')).getText();
        assert.deepStrictEqual(sprintName, name);
        await checkUrl();
    });

    it('cannot update a sprint with missing parameters', async () => {
        await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > button:nth-child(3)')).click();
        await updateSprint();
        let sprintName = await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > div:nth-child(1)')).getText();
        assert.deepStrictEqual(sprintName, name);
        await checkErrorMessage('Paramètre manquant ou incompatible');
        await checkUrl();
    });


    describe('Sprints containing user stories', () => {

        beforeEach(async () => {
            await UserStory.deleteMany({});
            const userStory = new UserStory({id: 'PUR-01', name: 'name', sprint: sprint._id});
            await userStory.save();
            project.backlog.userStories.push(userStory);
            await project.save();
        });

        it('cannot delete a sprint', async () => {
            await driver.get(url);
            await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.title > button:nth-child(4)')).click();
            await driver.sleep(100);
            await checkErrorMessage('Le sprint n\'a pas été supprimé');
            await checkUrl();
        });
    });

    async function checkErrorMessage(message) {
        let errorMessage = await driver.findElement(webdriver.By.css('#message > div')).getText();
        assert.strictEqual(errorMessage, message);
    }

    async function updateSprint(name){
        await driver.findElement(webdriver.By.css('#TISprint')).clear();
        if (name)
            await driver.findElement(webdriver.By.css('#TISprint')).sendKeys(name);
        await driver.findElement(webdriver.By.css('#validFormSprint')).click();
    }

    async function checkUrl() {
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, url);
    }
});











