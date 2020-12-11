const assert = require('assert');
const projectService = require('../../../src/services/projectService');
const db = require('../../../config/db');
const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');

describe('Projects service', () => {
    const name = 'mochatest';
    const key = 'MTES';

    before('connect', function(){
        db.connectToDB();
    });

    beforeEach('empty db', async() => {
        await db.emptyCollections();
    });

    describe('TTES-01 Create Project', () => {
        function testCatchAdd(done, key, name){
            projectService.addProject(key, name)
                .catch(() => {
                    Project.countDocuments((err, count) => {
                        assert.deepStrictEqual(count, 0);
                        done();
                    });
                });
        }

        it('cannot add an empty project', (done) => {
            testCatchAdd(done, null, null);
        });
        it('cannot add a project with no key', (done) => {
            testCatchAdd(done, null, name);
        });
        it('cannot add a project with no name', (done) => {
            testCatchAdd(done, key, null);
        });
        it('creates a project', (done) => {
            projectService.addProject(name, key)
                .then((data) => {
                    assert(!data.isNew);
                    Project.countDocuments((err, count) => {
                        assert.deepStrictEqual(count, 1);
                        done();
                    });
                });
        });
        it('cannot add the same project', (done) => {
            projectService.addProject(name, key)
                .then(() => projectService.addProject(name, key)
                    .catch(() => {
                        Project.countDocuments((err, count) => {
                            assert.deepStrictEqual(count, 1);
                            done();
                        });
                    })
                );
        });
    });

    describe('TTES-04 Update Project', () => {
        let id;
        const backlog = new Backlog({sprint: [], userStories: [], currentUSId: 16});
        const newName = 'newName';
        let objectif;

        async function testCatchUpdate(id, name, objectif){
            try {
                await projectService.updateProject(id, name);
            } catch (error) {
                const project = await Project.findOne({name: objectif.name});
                assert.deepStrictEqual(project._id, objectif.id);
                assert.deepStrictEqual(project.name, objectif.name);
                assert.deepStrictEqual(project.key, objectif.key);
                return;
            }
            assert(false);
        }

        beforeEach('add a project', async () => {
            let project = new Project({name: name, key: key, backlog: backlog, tasks: []});
            await project.save();
            id = project._id;
            objectif = {
                id:id,
                key:key,
                name:name
            };
        });

        it('cannot update with empty values', async () => {
            await testCatchUpdate(null, null, objectif);
        });
        it('cannot update a project with no id', async () => {
            await testCatchUpdate(null, newName, objectif);
        });
        it('cannot update a project with no name', async () => {
            await testCatchUpdate(id, null, objectif);
        });
        it('cannot update a project with invalid id', async () => {
            await testCatchUpdate(0, newName, objectif);
        });
        it('update a project', async () => {
            const data = await projectService.updateProject(id, newName);
            assert(!data.isNew);
            assert.deepStrictEqual(data._id, id);
            assert.deepStrictEqual(data.name, newName);
            assert.deepStrictEqual(data.key, key);
        });
        it('update a project doesn\'t modify its backlog', async () => {
            const data = await projectService.updateProject(id, newName);
            assert(!data.isNew);
            assert.deepStrictEqual(data.backlog.currentUSId, backlog.currentUSId);
        });
    });

    describe('TTES-07 List Projects', () => {
        let backlog = new Backlog({sprint: [], userStories: []});
        const name1 = 'project one', name2 = 'project 2';
        const key1 = 'KEY1', key2 = 'KEY2';

        beforeEach('add a projects', async () => {
            let project1 = new Project({name: name1, key: key1, backlog: backlog, tasks: []});
            await project1.save();
            let project2 = new Project({name: name2, key: key2, backlog: backlog, tasks: []});
            await project2.save();
        });

        it('return all the projects added', async () => {
            let projects = await projectService.getProjectList();
            assert.deepStrictEqual(projects.length, 2);
            assert.deepStrictEqual(projects[0].name, name1);
            assert.deepStrictEqual(projects[1].name, name2);
            assert.deepStrictEqual(projects[0].key, key1);
            assert.deepStrictEqual(projects[1].key, key2);
        });
    });
});



