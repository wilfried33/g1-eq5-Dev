const webdriver = require('selenium-webdriver');
const Project = require('../../src/models/project');
const UserStory = require('../../src/models/userStory');
const Sprint = require('../../src/models/sprint');
const db = require('../../config/db');
const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const {Builder, By, until} = require('selenium-webdriver');
require('../../src/app');



describe('ID05 E2E test', () => {
    let driver;
    let userStory;
    let project;
    let sprintId;

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
        const sprint = new Sprint({name: 'Sprint 1', startDate: '2020-01-12', endDate: '2020-01-19'});
        await sprint.save();
        sprintId = sprint._id;
        project = new Project({name: 'Purple Project', key: 'PUR'});
        project.backlog.userStories.push(userStory);
        project.backlog.sprints.push(sprint);
        await project.save();
        await driver.get('http://localhost:8080/');
        await driver.manage().addCookie({name:'project', value: project._id.toString()});
        const url = 'http://localhost:8080/backlog';
        await driver.get(url);
    });

    after(async () => {
        await driver.quit();
    });


    it('move us from backlog to sprint', async () => {
        const from = await driver.findElement(webdriver.By.css('body > div.list.draggable_drop > div.draggable.d-flex a.list_line'));
        const to = await driver.findElement(webdriver.By.css('#Sprint' + sprintId + ' > div.list.draggable_drop > div'));
        await driver.sleep(1000);
        const actions = driver.actions({async: true});
        await actions.dragAndDrop(from, to).perform();
        const result = await driver.findElement(webdriver.By.css('body > div:nth-child(5) > div.list.draggable_drop > div.draggable.d-flex > a')).getText();
        assert.strictEqual(result, id);
    });
});









