process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');

describe('ID30 E2E test', () => {
    let driver;
    const name = 'Purple Project';
    const key = 'PUR';
    const name2 = 'Blue Project';
    const key2 = 'BLU';

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await Project.deleteMany({});
        let project = new Project({name: name, key: key});
        let project2 = new Project({name: name2, key: key2});
        await project.save();
        await project2.save();
    });

    after(async () => {
        await driver.quit();
    });

    it('view projects', async () => {
        await driver.get('http://localhost:8080/projects/');
        let registeredKey = await driver.findElement(webdriver.By.css('div.list > div:nth-child(2) > a > div.elements.value')).getText();
        let registeredName = await driver.findElement(webdriver.By.css('div.list > div:nth-child(2) > a > div.elements.text')).getText();
        let registeredKey2 = await driver.findElement(webdriver.By.css('div.list > div:nth-child(3) > a > div.elements.value')).getText();
        let registeredName2= await driver.findElement(webdriver.By.css('div.list > div:nth-child(3) > a > div.elements.text')).getText();
        assert.deepStrictEqual(registeredKey, key);
        assert.deepStrictEqual(registeredName, name);
        assert.deepStrictEqual(registeredKey2, key2);
        assert.deepStrictEqual(registeredName2, name2);
    });
});









