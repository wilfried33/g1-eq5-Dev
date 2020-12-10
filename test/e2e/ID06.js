const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');
const db = require('../../config/db');



describe('ID06 E2E test', () => {
    let driver;

    const name = 'Sprint 1';
    const startDate = '12/01/2020';
    const endDate = '26/01/2020';

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await db.emptyCollections();
        await driver.manage().deleteAllCookies();

        const project = new Project({name: 'Purple Project', key: 'PUR'});
        project.save();
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
        const url = 'http://localhost:8080/backlog';
        await driver.get(url);
        await driver.findElement(webdriver.By.css('#showFormNS')).click();
    });

    after(async () => {
        await driver.quit();
    });

    it('create a sprint', async () => {
        await driver.findElement(webdriver.By.css('#nameNS')).sendKeys(name);
        await driver.findElement(webdriver.By.css('#startNS')).sendKeys(startDate);
        await driver.findElement(webdriver.By.css('#endNS')).sendKeys(endDate);
        await driver.findElement(webdriver.By.css('#validFormNS')).click();
        const registeredName = await driver.findElement(webdriver.By.css('body > div:nth-child(5) > .title > div:nth-child(1)')).getText();
        assert.deepStrictEqual(registeredName, name);
    });

    it('cancel a sprint\'s creation', async () => {
        await driver.findElement(webdriver.By.css('#rejectFormNS')).click();
        await checkNoSprint();
    });

    it('create a sprint with missing parameters', async () => {
        await driver.findElement(webdriver.By.css('#nameNS')).sendKeys(name);
        await driver.findElement(webdriver.By.css('#validFormNS')).click();
        await checkNoSprint();
        let errorMessage = await driver.findElement(webdriver.By.css('#message > div')).getText();
        assert.strictEqual(errorMessage, 'Paramètre manquant ou incompatible');
    });

    async function checkNoSprint() {
        const registeredSprints = await driver.findElements(webdriver.By.css('body > div:nth-child(5) > .title'));
        assert.deepStrictEqual(registeredSprints.length, 0);
    }

});









