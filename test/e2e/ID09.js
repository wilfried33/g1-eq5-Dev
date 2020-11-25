process.env.NODE_ENV = 'test';

const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const Sprint = require('../../src/models/sprint');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');



describe('ID09 E2E test', () => {
    let driver;
    let url;
    let project;

    const name = 'First US';
    const id = 'PUR-01';
    const description = 'some description';
    const priority = 1;
    const difficulty = 1;

    const name2 = 'Second US';
    const id2 = 'PUR-02';
    const description2 = 'some other description';
    const priority2 = 3;
    const difficulty2 = 3;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await Project.deleteMany({});
        await UserStory.deleteMany({});
        await Sprint.deleteMany({});
        const sprint = new Sprint({name: 'Sprint 1', startDate: '2020-01-12', endDate: '2020-01-19'});
        await sprint.save();
        const userStory = new UserStory({id: id, name: name, description: description, priority: priority, difficulty: difficulty});
        await userStory.save();
        const userStory2 = new UserStory({id: id2, name: name2, description: description2, priority: priority2, difficulty: difficulty2, sprint: sprint._id});
        await userStory2.save();
        project = new Project({name: 'Purple Project', key: 'PUR'});
        project.backlog.userStories.push(userStory);
        project.backlog.userStories.push(userStory2);
        project.backlog.sprints.push(sprint);
        await project.save();
        url = 'http://localhost:8080/backlog?projectId='+project._id;
    });

    beforeEach(async () => {
        await driver.get(url);
    })

    after(async () => {
        await driver.quit();
    });

    it('see userStories in backlog', async () => {
        const registeredId = await driver.findElement(webdriver.By.css('body > div.list a div:nth-child(1)')).getText();
        const registeredName = await driver.findElement(webdriver.By.css('body > div.list a div:nth-child(2)')).getText();
        const registeredDifficulty = await driver.findElement(webdriver.By.css('body > div.list a div:nth-child(3)')).getText();
        const registeredPriority = await driver.findElement(webdriver.By.css('body > div.list a div:nth-child(4)')).getText();
        await checkUserStories({id: registeredId, name: registeredName, priority: registeredDifficulty, difficulty: registeredPriority},
            {id: id, name: name, description: description, priority: priority, difficulty: difficulty});
    });

    it('see userStories in a sprint', async () => {
        const registeredId = await driver.findElement(webdriver.By.css('div:nth-child(5) > .list a div:nth-child(1)')).getText();
        const registeredName = await driver.findElement(webdriver.By.css('div:nth-child(5) > .list a div:nth-child(2)')).getText();
        const registeredDifficulty = await driver.findElement(webdriver.By.css('div:nth-child(5) > .list a div:nth-child(3)')).getText();
        const registeredPriority = await driver.findElement(webdriver.By.css('div:nth-child(5) > .list a div:nth-child(4)')).getText();
        await checkUserStories({id: registeredId, name: registeredName, priority: registeredDifficulty, difficulty: registeredPriority},
            {id: id2, name: name2, priority: priority2, difficulty: difficulty2});
    });

    async function checkUserStories(registeredUserStory, userStory) {
        assert.strictEqual(registeredUserStory.id, userStory.id);
        assert.strictEqual(registeredUserStory.name, userStory.name);
        assert.strictEqual(registeredUserStory.difficulty, userStory.difficulty+'');
        assert.strictEqual(registeredUserStory.priority, userStory.priority+'');
    }
});









