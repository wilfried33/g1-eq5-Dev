const webdriver = require('selenium-webdriver');
const db = require('../../config/db');
const Project = require('../../src/models/project');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');

describe('ID28 E2E test', () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await db.emptyCollections();
        await new Project({name: 'Blue Project', key: 'BLU'}).save();
        await driver.manage().deleteAllCookies();
        await driver.get('http://localhost:8080/');
    });

    after(async () => {
        await driver.quit();
    });

    it('redirect on /projects', async () => {
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, 'http://localhost:8080/projects');
    });

    it('navigation without project selected', async () => {
        await driver.findElement(webdriver.By.css('.top-element > .menu > a:nth-child(2)')).click();
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, 'http://localhost:8080/backlog');
        let errorMessage = await driver.findElement(webdriver.By.css('#message > div')).getText();
        assert.strictEqual(errorMessage, 'Le backlog n\'a pas été trouvé');
    });

    it('navigation to backlog with a project selected', async () => {
        await driver.findElement(webdriver.By.css('.list button > div.elements.text')).click();
        await driver.findElement(webdriver.By.css('.top-element > .menu > a:nth-child(2)')).click();
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, 'http://localhost:8080/backlog');
    });

    it('navigation to kanban with a project selected', async () => {
        await driver.findElement(webdriver.By.css('.list button > div.elements.text')).click();
        await driver.findElement(webdriver.By.css('body > div.top-element > div.menu > a:nth-child(3)')).click();
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, 'http://localhost:8080/task');
    });
    it('navigation to not implemented pages', async () => {
        await driver.findElement(webdriver.By.css('.list button > div.elements.text')).click();
        await driver.findElement(webdriver.By.css('body > div.top-element > div.menu > a:nth-child(4)')).click();
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, 'http://localhost:8080/projects');
    });

});









