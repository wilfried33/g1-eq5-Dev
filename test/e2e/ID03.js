const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const Task = require('../../src/models/task');
const assert = require('assert');
const {Builder} = require('selenium-webdriver');
require('../../src/app');


describe('ID03 E2E', () => {

    let driver;
    let userStory;
    const projectName = 'Purple Project';
    const projectKey = 'PUR';
    const name = 'US';
    const description = 'some description';
    const newName = 'new US name';
    let project, url;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await Project.deleteMany({});
        await UserStory.deleteMany({});
        userStory = new UserStory({id: projectKey + '-01', name: name, description: description});
        await userStory.save();
        project = new Project({name: projectName, key: projectKey});
        project.backlog.userStories.push(userStory);
        await project.save();
        url = 'http://localhost:8080/backlog?projectId='+project._id;
    });

    after(async () => {
        await driver.quit();
    });

    describe('delete US test', () => {

        beforeEach(async () => {
            await driver.get(url);
        });

        it('delete a user story', async () => {
            await driver.findElement(webdriver.By.css('div:nth-child(4) > button ')).click();
            await driver.sleep(100);
            await checkListSize(0);
        });

        it('update a user story', async () => {
            await updateUserStory();
            await checkUrl();
            let usUpdated = await driver.findElement(webdriver.By.css('a.list_line > div.elements.text')).getText();
            assert.deepStrictEqual(usUpdated, newName);
        });

        it('update a user story with missing parameters', async () => {
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
                let task = new Task({id:taskId, name: taskName, userStoryID: userStory._id});
                await task.save();
                project.tasks.push(task);
                userStory.taskCount++;
                await userStory.save();
                await project.save();
                await driver.get(url);
            });

            it('cannot delete an user story', async () => {
                const deleteButton = await driver.findElements(webdriver.By.css('div:nth-child(4) > button'));
                assert.deepStrictEqual(deleteButton.length, 0);
            });

            it('cannot update an user story', async () => {
                const updateButton = await driver.findElements(webdriver.By.css('div:nth-child(3) > button  '));
                assert.deepStrictEqual(updateButton.length, 0);
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
        await driver.findElement(webdriver.By.css('div:nth-child(3) > button  ')).click();
    }

    async function updateUserStory() {
        await clickOnUpdate();
        await driver.findElement(webdriver.By.css('#TIUS')).clear();
        await driver.findElement(webdriver.By.css('#TIUS')).sendKeys(newName);
        await driver.findElement(webdriver.By.css('#validFormUS')).click();
    }
});








