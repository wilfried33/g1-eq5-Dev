const webdriver = require('selenium-webdriver');
const projectService = require('../../src/services/projectService');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');
const db = require('../../config/db');



describe('ID18 E2E test', () => {
    let driver;
    const username = 'name';
    const rules = 'rule 1 \n rule 2';
    let url;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await db.emptyCollections();
        await driver.manage().deleteAllCookies();
        const project = await projectService.addProject('Purple Project', 'PUR');
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
        url = 'http://localhost:8080/dod';
        await driver.get(url);
        await driver.findElement(webdriver.By.css('#showFormADod')).click();
    });

    after(async () => {
        await driver.quit();
    });

    it('create a dod', async () => {
        await driver.findElement(webdriver.By.css('#TIDod')).sendKeys(username);
        await driver.findElement(webdriver.By.css('#RUDod')).sendKeys(rules);
        await driver.findElement(webdriver.By.css('#validFormADod')).click();
        await checkUrl(url);
    });

    it('cancel a dod\'s creation', async () => {
        await driver.findElement(webdriver.By.css('#rejectFormADod')).click();
        await checkUrl(url);
    });

    async function checkUrl(url) {
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, url);
    }
});









