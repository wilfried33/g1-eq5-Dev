process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const Sprint = require('../../src/models/sprint');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');
const db = require('../../config/db');


describe('ID10 E2E test', () => {
    let driver;
    let url;
    let userStory;
    let project;

    const name = 'First US';
    const id = 'PUR-01';
    const description = 'some description';
    const priority = 1;
    const difficulty = 1;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async () => {
        await db.emptyCollections();
        await driver.manage().deleteAllCookies();
        userStory = new UserStory({id: id, name: name, description: description, priority: priority, difficulty: difficulty});
        await userStory.save();
        project = new Project({name: 'Purple Project', key: 'PUR'});
        project.backlog.userStories.push(userStory);
        await project.save();
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
        url = 'http://localhost:8080/backlog';
    });

    after(async () => {
        await driver.quit();
    });

    it('see a user story in backlog', async () => {
        await checkUserStory();
    });

    it('see a user story in a sprint', async () => {
        const sprint = new Sprint({name: 'Sprint 1', startDate: '2020-01-12', endDate: '2020-01-19'});
        await sprint.save();
        project.backlog.sprints.push(sprint);
        userStory.sprint = sprint._id;
        await userStory.save();
        await project.save();
        await checkUserStory();
    });

    async function checkUserStory() {
        await driver.get(url);
        await driver.findElement(webdriver.By.css('a.list_line')).click();
        const registeredId = await driver.findElement(webdriver.By.css('body > div:nth-child(4) > div:nth-child(2)')).getText();
        const registeredName = await driver.findElement(webdriver.By.css('body > div:nth-child(4) > div:nth-child(4)')).getText();
        const registeredDescription = await driver.findElement(webdriver.By.css('body > div:nth-child(4) > div:nth-child(6)')).getText();
        const registeredDifficulty = await driver.findElement(webdriver.By.css('body > div:nth-child(4) > div:nth-child(8)')).getText();
        const registeredPriority = await driver.findElement(webdriver.By.css('body > div:nth-child(4) > div:nth-child(10)')).getText();
        assert.strictEqual(registeredId, id);
        assert.strictEqual(registeredName, name);
        assert.strictEqual(registeredDescription, description);
        assert.strictEqual(registeredDifficulty, difficulty+'');
        assert.strictEqual(registeredPriority, priority+'');
    }
});









