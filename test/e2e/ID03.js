process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const Task = require('../../src/models/task');
const assert = require('assert');
const {Builder} = require('selenium-webdriver');
require('../../src/app');

let driver;
const projectName = 'Purple Project';
const projectKey = 'PUR';
const name = 'US';
const description = 'some description';
const newName = 'new US name';
let usId, project, url;


describe('ID03 E2E', () => {

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await Project.deleteMany({});
        await UserStory.deleteMany({});
        usId = projectKey + '-01';
        let userStory = new UserStory({id: usId, name: name, description: description});
        await userStory.save();
        project = new Project({name: projectName, key: projectKey});
        project.backlog.userStories.push(userStory);
        await project.save();
        url = 'http://localhost:8080/backlog?projectId='+project._id;
        await driver.get(url);
    });

    after(async () => {
        await driver.quit();
    });

    describe('delete US test', () => {

        it('delete an user story', async () => {
            await driver.findElement(webdriver.By.css('.list > div.list_line > div:nth-child(7) > button ')).click();
            await checkListSize(0);
        });

        it('update an user story', async () => {
            await updateUserStory();
            await checkUrl();
            let usUpdated = await driver.findElement(webdriver.By.css('.list > div.list_line > div.elements.text')).getText();
            assert.deepStrictEqual(usUpdated, newName);
        });

        it('update an user story with missing parameters', async () => {
            await clickOnUpdate();
            await driver.findElement(webdriver.By.css('#TIUS')).clear();
            await driver.findElement(webdriver.By.css('#validFormUS')).click();
            await checkUrl();
            await checkErrorMessage('Paramètre manquant ou incompatible');
        });

        describe('with tasks linked', () => {
            const taskId = 'TTES-01';
            const taskName = 'Unit tests';
            beforeEach(async () => {
                await Task.deleteMany({});
                let task = new Task({id:taskId, name: taskName, userStoryID: usId});
                await task.save();
                project.tasks.push(task);
                await project.save();
            });

            it('cannot delete an user story', async () => {
                await driver.findElement(webdriver.By.css('.list > div.list_line > div:nth-child(7) > button ')).click();
                await checkListSize(1);
            });

            it('cannot update an user story', async () => {
                await updateUserStory();
                await checkUrl();
                let usUpdated = await driver.findElement(webdriver.By.css('.list > div.list_line > div.elements.text')).getText();
                assert.deepStrictEqual(usUpdated, name);
            });

        });
    });
});

async function checkUrl() {
    const currentUrl = await driver.getCurrentUrl();
    assert.deepStrictEqual(currentUrl, url);
}

async function checkListSize(expected){
    await driver.sleep(100);
    let usList = await driver.findElements(webdriver.By.css('.list > div.list_line'));
    assert.deepStrictEqual(usList.length, expected);
}

async function checkErrorMessage(message) {
    let errorMessage = await driver.findElement(webdriver.By.css('#message > div')).getText();
    assert.strictEqual(errorMessage, message);
}

async function clickOnUpdate() {
    await driver.findElement(webdriver.By.css('.list > div.list_line > div:nth-child(6) > button ')).click();
}

async function updateUserStory() {
    await clickOnUpdate();
    await driver.findElement(webdriver.By.css('#TIUS')).clear();
    await driver.findElement(webdriver.By.css('#TIUS')).sendKeys(newName);
    await driver.findElement(webdriver.By.css('#validFormUS')).click();
}






