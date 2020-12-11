const assert = require('assert');
const db = require('../../../config/db');
const developerService = require('../../../src/services/developerService');
const Developer = require('../../../src/models/developer');
const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');


describe('Developer service', () => {
    const username = 'username';

    async function testCatchAddDev(username){
        try {
            await developerService.addDeveloper(username);
        } catch (error) {
            const count = await Developer.countDocuments()
            assert.deepStrictEqual(count, 0);
            return;
        }
        assert(false);
    }

    before('connect', function(){
        db.connectToDB();
    });

    beforeEach('empty db', async () => {
        await db.emptyCollections();
    });

    describe('TTES-61 Create Developer', () => {

        it('Add a developer', async () => {
            const developer = await developerService.addDeveloper(username);
            assert.deepStrictEqual(developer.username, username);
            assert.deepStrictEqual(developer.isNew, false);
        });

        it('cannot add a developer without username', async () => {
            testCatchAddDev(null)
        });

        it('cannot add a developer with an existing username', async () => {
            await developerService.addDeveloper(username)
            testCatchAddDev(username);
        });

    });

    describe('TTES-61 Set Developer into a project', () => {
        let developer;
        let project;

        async function testCatchSetInProject(project, developer, type){
            try {
                await developerService.setDeveloperInProject(project, developer, type)
            } catch (error) {
                if(!project)
                    return;
                assert.deepStrictEqual(project.developers.length, 0);
                assert.deepStrictEqual(project.maintainers.length, 0);
                return;
            }
            assert(false)
        }

        beforeEach('', async () => {
            await Project.deleteMany({});
            await Backlog.deleteMany({});
            developer = new Developer({username:username});
            await developer.save();

            project = new Project({key:'MTES', name:'mochatest'});
            await project.save();
        });

        it('Set a developer in project', async () => {
            project = await developerService.setDeveloperInProject(project, developer, '0');
            assert.deepStrictEqual(project.developers.length, 1);
            assert.deepStrictEqual(project.maintainers.length, 0);
        });
        it('Set a maintainer in project', async () => {
            project = await developerService.setDeveloperInProject(project, developer, '1');
            assert.deepStrictEqual(project.developers.length, 0);
            assert.deepStrictEqual(project.maintainers.length, 1);
        });


        it('cannot set a developer with invalid project', async () => {
            await testCatchSetInProject(null, developer, 0);
        });
        it('cannot set a developer with invalid developer', async () => {
            await testCatchSetInProject(project, 'qhg<begge', 0);
        });
        it('cannot set a developer with invalid type', async () => {
            await testCatchSetInProject(project, developer, 150);
        });

    });
});
