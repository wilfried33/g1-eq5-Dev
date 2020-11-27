process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const assert = require('assert');
const {Builder} = require('selenium-webdriver');
require('../../src/app');


let driver;
const projectName = 'Purple Project';
const projectKey = 'PUR';
let projectId, backlogUrl;
const usName = 'Some US name';
const usDescription = 'Some US description';


describe('ID02 E2E', () => {

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await Project.deleteMany({});
        let project = new Project({name: projectName, key: projectKey});
        await project.save();
        projectId = project._id;
        backlogUrl = 'http://localhost:8080/backlog?projectId=' + projectId;
        await driver.get(backlogUrl);
        await driver.findElement(webdriver.By.id('addUSButton')).click();
    });

    after(async () => {
        await driver.quit();
    });


    it('add a user story', async () => {
        await driver.findElement(webdriver.By.id('name')).sendKeys(usName);
        await driver.findElement(webdriver.By.id('description')).sendKeys(usDescription);
        await driver.findElement(webdriver.By.id('validForm')).click();
        const url = await driver.getCurrentUrl();
        assert.deepStrictEqual(url, backlogUrl);
        let registeredName = await driver.findElement(webdriver.By.css('body > div.list > div.list_line.hover > div.small_case.elements.value')).getText();
        let registeredDescription = await driver.findElement(webdriver.By.css('body > div.list > div.list_line.hover > div.elements.text')).getText();
        assert.deepStrictEqual(registeredName, usName);
        assert.deepStrictEqual(registeredDescription, usDescription);
    });

    it('cancel the creation of a user story', async () => {
        await driver.findElement(webdriver.By.id('rejectForm')).click();
        const url = await driver.getCurrentUrl();
        assert.deepStrictEqual(url, 'http://localhost:8080/backlog?projectId=' + projectId);
        let projectList = await driver.findElements(webdriver.By.css('body > div.list > div.list_line'));
        assert.deepStrictEqual(projectList.length, 0);
    });

    it('cannot add an project with missing parameters', async () => {
        await driver.findElement(webdriver.By.id('name')).sendKeys(projectKey);
        await driver.findElement(webdriver.By.id('validForm')).click();
        await checkErrorMessage('Champs manquant');
    });

});

async function checkErrorMessage(message) {
    let errorMessage = await driver.findElement(webdriver.By.css('body > div.error')).getText();
    assert.strictEqual(errorMessage, message);
}
