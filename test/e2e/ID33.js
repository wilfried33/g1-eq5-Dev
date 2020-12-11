const webdriver = require('selenium-webdriver');
const projectService = require('../../src/services/projectService');
const dodService = require('../../src/services/dodService');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');
const db = require('../../config/db');



describe('ID33 E2E test', () => {
    let driver;
    const newDod = {
        name: 'name',
        rules: 'rule 1'
    };
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
        await dodService.addDod(project, 'test dod', ['test', 'push'] );
        url = 'http://localhost:8080/dod';
        await driver.get(url);
        await driver.findElement(webdriver.By.css('div:nth-child(3) > div.title > button:nth-child(2)')).click();
    });

    after(async () => {
        await driver.quit();
    });

    it('update a dod', async () => {
        await driver.findElement(webdriver.By.css('#FormUDod #TIDod')).clear();
        await driver.findElement(webdriver.By.css('#FormUDod #TIDod')).sendKeys(newDod.name);
        await driver.findElement(webdriver.By.css('#FormUDod #RUDod')).clear();
        await driver.findElement(webdriver.By.css('#FormUDod #RUDod')).sendKeys(newDod.rules);
        await driver.findElement(webdriver.By.css('#validFormUDod')).click();
        await checkUrl(url);
        const name = await driver.findElement(webdriver.By.css('div:nth-child(3) > div.title > div')).getText();
        assert.deepStrictEqual(name, newDod.name);
    });

    it('cancel a dod\'s update', async () => {
        await driver.findElement(webdriver.By.css('#rejectFormUDod')).click();
        await checkUrl(url);
    });

    async function checkUrl(url) {
        const currentUrl = await driver.getCurrentUrl();
        assert.deepStrictEqual(currentUrl, url);
    }
});









