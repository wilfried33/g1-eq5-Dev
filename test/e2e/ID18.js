const webdriver = require('selenium-webdriver');
const projectService = require('../../src/services/projectService');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');
const db = require('../../config/db');



describe('ID18 E2E test', () => {
    let driver;
    const username = 'userlogin';

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await db.emptyCollections();
        await driver.manage().deleteAllCookies();
        const project = await projectService.addProject('Purple Project', 'PUR');
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
        await driver.get('http://localhost:8080/task');
        await driver.findElement(webdriver.By.css('#addDeveloperButton')).click();
    });

    after(async () => {
        await driver.quit();
    });

    it('create a developer', async () => {
        await driver.findElement(webdriver.By.css('#username')).sendKeys(username);
        await driver.findElement(webdriver.By.css('#validForm')).click();
        await driver.sleep(1000);
        await checkUrl('http://localhost:8080/task');
    });

    it('cancel a developer\'s creation', async () => {
        await driver.findElement(webdriver.By.css('#rejectForm')).click();
        await checkUrl('http://localhost:8080/task');
    });

    it('create a developer with missing parameters', async () => {
        await driver.findElement(webdriver.By.css('#validForm')).click();
        await driver.sleep(1000);
        await checkUrl('http://localhost:8080/developer/create');
        let errorMessage = await driver.findElement(webdriver.By.css('#message > div')).getText();
        assert.strictEqual(errorMessage, 'Paramètre manquant ou incompatible');
    });

    async function checkUrl(url) {
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, url);
    }
});









