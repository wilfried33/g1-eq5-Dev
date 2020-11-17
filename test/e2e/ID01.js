process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');

let driver;
const name = 'Purple Project';
const key = 'PUR';
const newName = 'Blue Project';

describe('ID1 E2E', () => {

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await Project.deleteMany({});
    });

    after(async () => {
        await driver.quit();
    });

    describe('Creation test', () => {

        beforeEach(async () => {
            await driver.get('http://localhost:8080/projects/create');
        });

        it('add a project', async () => {
            await fillNewProjectForm();
            await driver.findElement(webdriver.By.id('validForm')).click();
            const url = await driver.getCurrentUrl();
            assert.deepStrictEqual(url, 'http://localhost:8080/projects');
            await checkProjectInList(key, name);
        });

        it('cancel the creation of a project', async () => {
            await driver.findElement(webdriver.By.id('rejectForm')).click();
            const url = await driver.getCurrentUrl();
            assert.deepStrictEqual(url, 'http://localhost:8080/projects');
            let projectList = await driver.findElements(webdriver.By.css('body > div.list > div.d-flex > a'));
            assert.deepStrictEqual(projectList.length, 0);
        });

        it('cannot add an project with missing parameters', async () => {
            await driver.findElement(webdriver.By.id('key')).sendKeys(key);
            await driver.findElement(webdriver.By.id('validForm')).click();
            await checkErrorMessage('Champs manquant');
        });

        it('cannot add a project similar to an existing one', async () => {
            await addProject(name, key);
            await fillNewProjectForm();
            await driver.findElement(webdriver.By.id('validForm')).click();
            await checkErrorMessage('Projet similaire existant');
        });

    });

    describe('Update test', () => {

        beforeEach(async () => {
            await addProject(name, key);
            await driver.get('http://localhost:8080/projects');
            await driver.findElement(webdriver.By.id('drawFormProjectPUR')).click();
        });

        it('update a project', async () => {
            await fillUpdateForm();
            await checkProjectInList(key, newName);
        });

        it('cancel the update of a project', async () => {
            await driver.findElement(webdriver.By.id('rejectForm')).click();
            const url = await driver.getCurrentUrl();
            assert.deepStrictEqual(url, 'http://localhost:8080/projects');
            let projectList = await driver.findElements(webdriver.By.css('body > div.list > div.d-flex > a'));
            assert.deepStrictEqual(projectList.length, 1);
        });

        it('cannot add update project with missing parameters', async () => {
            await driver.findElement(webdriver.By.id('name')).clear();
            await driver.findElement(webdriver.By.id('validForm')).click();
            await checkErrorMessage('Champs manquant');
        });

        it('cannot update a project with similar data than an existing one', async () => {
            await addProject(newName, 'KEY');
            await fillUpdateForm();
            await checkErrorMessage('Projet similaire existant');
        });
    });
});

async function addProject(name, key) {
    let project = new Project({name: name, key: key});
    await project.save();
}

async function fillNewProjectForm() {
    await driver.findElement(webdriver.By.id('name')).sendKeys(name);
    await driver.findElement(webdriver.By.id('key')).sendKeys(key);
}

async function fillUpdateForm() {
    await driver.findElement(webdriver.By.id('name')).clear();
    await driver.findElement(webdriver.By.id('name')).sendKeys(newName);
    await driver.findElement(webdriver.By.id('validForm')).click();
}

async function checkProjectInList(key, name) {
    let registeredKey = await driver.findElement(webdriver.By.css('div.list > div:nth-child(2) > a > div.elements.value')).getText();
    let registeredName = await driver.findElement(webdriver.By.css('div.list > div:nth-child(2) > a > div.elements.text')).getText();
    assert.deepStrictEqual(registeredKey, key);
    assert.deepStrictEqual(registeredName, name);
}

async function checkErrorMessage(message) {
    let errorMessage = await driver.findElement(webdriver.By.css('body > div.error')).getText();
    assert.strictEqual(errorMessage, message);
}






