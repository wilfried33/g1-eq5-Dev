const assert = require('assert');
const db = require('../../../config/db');
const developerService = require('../../../src/services/developerService');
const Developer = require('../../../src/models/developer');
const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');



describe('Developer service', () => {
    const username = 'username';

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

        it('cannot add a developer without username', (done) => {
            developerService.addDeveloper().catch(() => {
                Developer.countDocuments().then((count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('cannot add a developer with an existing username', (done) => {
            developerService.addDeveloper(username).then(() =>
                developerService.addDeveloper(username).catch(() => {
                    Developer.countDocuments().then((count) => {
                        assert.deepStrictEqual(count, 1);
                        done();
                    });
                }));
        });

    });

    describe('TTES-61 Set Developer into a project', () => {
        let developer;
        let project;

        beforeEach('', async () => {
            await Project.deleteMany({});
            await Backlog.deleteMany({});
            developer = new Developer({username:username});
            await developer.save();

            project = new Project({key:'MTES', name:'mochatest'});
            await project.save();
        });

        it('Set a developer in project', async () => {
            project = await developerService.setDeveloperInProject(project._id, developer, '0');
            assert.deepStrictEqual(project.developers.length, 1);
            assert.deepStrictEqual(project.maintainers.length, 0);
        });
        it('Set a maintainer in project', async () => {
            project = await developerService.setDeveloperInProject(project._id, developer, '1');
            assert.deepStrictEqual(project.developers.length, 0);
            assert.deepStrictEqual(project.maintainers.length, 1);
        });


        it('cannot set a developer with project invalid', (done) => {
            developerService.setDeveloperInProject('qvnbqibqrb', developer, 0)
                .catch(() => {
                    assert.deepStrictEqual(project.developers.length, 0);
                    assert.deepStrictEqual(project.maintainers.length, 0);
                    done();
                });
        });
        it('cannot set a developer with developer invalid', (done) => {
            developerService.setDeveloperInProject(project._id, 'qsbFF', 0)
                .catch(() => {
                    assert.deepStrictEqual(project.developers.length, 0);
                    assert.deepStrictEqual(project.maintainers.length, 0);
                    done();
                });
        });
        it('cannot set a developer with type invalid', (done) => {
            developerService.setDeveloperInProject(project._id, developer, 150)
                .catch(() => {
                    assert.deepStrictEqual(project.developers.length, 0);
                    assert.deepStrictEqual(project.maintainers.length, 0);
                    done();
                });
        });

    });
});
