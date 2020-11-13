process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');

describe('ID1 E2E test', () => {
    let driver;
    const name = 'Purple Project';
    const key = 'PUR';

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await Project.deleteMany({});
        await driver.get('http://localhost:8080/projects/create');
    });

    after(async () => {
        await driver.quit();
    });

    it('add a project', async () => {
        await driver.findElement(webdriver.By.id('name')).sendKeys(name);
        await driver.findElement(webdriver.By.id('key')).sendKeys(key);
        await driver.findElement(webdriver.By.id('validForm')).click();
        const url = await driver.getCurrentUrl();
        assert.deepStrictEqual(url, "http://localhost:8080/projects");
        let registeredKey = await driver.findElement(webdriver.By.css('div.list > div:nth-child(2) > a > div.elements.value')).getText();
        let registeredName = await driver.findElement(webdriver.By.css('div.list > div:nth-child(2) > a > div.elements.text')).getText();
        assert.deepStrictEqual(registeredKey, key);
        assert.deepStrictEqual(registeredName, name);
    });

    it('cancel the creation of a project', async () => {
        await driver.findElement(webdriver.By.id('rejectForm')).click();
        const url = await driver.getCurrentUrl();
        assert.deepStrictEqual(url, "http://localhost:8080/projects");
        let projectList = await driver.findElements(webdriver.By.css('body > div.list > div.d-flex > a'));
        assert.deepStrictEqual(projectList.length, 0);
    });
});









