process.env.NODE_ENV = 'test';

const assert = require('assert');
const projectService = require('../../../src/services/projectService');
const dbConfig = require('../../../config/db');
const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');


describe('Projects service', () => {
    const name = "mochatest";
    const key = "MTES";

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', (done) => {
        Project.deleteMany({}).then(() => done());
    });

    describe('TTES-01 Create Project', () => {

        it('cannot add an empty project', (done) => {
            projectService.addProject().catch(() => {
                Project.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('cannot add a project with no key', (done) => {
            projectService.addProject(name).catch(() => {
                Project.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('cannot add a project with no name', (done) => {
            projectService.addProject(null, key).catch(() => {
                Project.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 0);
                    done();
                });
            });
        });

        it('creates a project', (done) => {
            projectService.addProject(name, key).then((data) => {
                assert(!data.isNew);
                Project.countDocuments((err, count) => {
                    assert.deepStrictEqual(count, 1);
                    done();
                });
            });
        });

        it('cannot add the same project', (done) => {
            projectService.addProject(name, key)
                .then(() =>  projectService.addProject(name, key)
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
        let backlog = new Backlog({sprint: [], userStories: [], currentUSId: 16});
        const newName = "newName";
        const newKey = "NKEY";

        beforeEach('add a project', (done) => {
            let project = new Project({name: name, key: key, backlog: backlog, tasks: []});
            project.save().then(() => {
                Project.findOne({name: name}).then((p) => {
                    id = p._id;
                    done();
                });
            });
        });

        it('cannot update with empty values', (done) => {
            projectService.updateProject().catch(() => {
                Project.findOne({name: name}).then((p) => {
                    assert.deepStrictEqual(p._id, id);
                    assert.deepStrictEqual(p.name, name);
                    assert.deepStrictEqual(p.key, key);
                    done();
                });
            });
        });

        it('cannot update a project with no id', (done) => {
            projectService.updateProject(null, name, key).catch(() => {
                Project.findOne({name: name}).then((p) => {
                    assert.deepStrictEqual(p._id, id);
                    assert.deepStrictEqual(p.name, name);
                    assert.deepStrictEqual(p.key, key);
                    done();
                });
            });
        });

        it('cannot update a project with no name', (done) => {
            projectService.updateProject(id, null, key).catch(() => {
                Project.findOne({name: name}).then((p) => {
                    assert.deepStrictEqual(p._id, id);
                    assert.deepStrictEqual(p.name, name);
                    assert.deepStrictEqual(p.key, key);
                    done();
                });
            });
        });

        it('cannot update a project with no key', (done) => {
            projectService.updateProject(id, name, null).catch(() => {
                Project.findOne({name: name}).then((p) => {
                    assert.deepStrictEqual(p._id, id);
                    assert.deepStrictEqual(p.name, name);
                    assert.deepStrictEqual(p.key, key);
                    done();
                });
            });
        });

        it('cannot update a project with invalid id', (done) => {
            projectService.updateProject(0, name, key).catch(() => {
                Project.findOne({name: name}).then((p) => {
                    assert.deepStrictEqual(p._id, id);
                    assert.deepStrictEqual(p.name, name);
                    assert.deepStrictEqual(p.key, key);
                    done();
                });
            });
        });

        it('update a project', (done) => {
            projectService.updateProject(id, newName, newKey).then((data) => {
                assert(!data.isNew);
                assert.deepStrictEqual(data._id, id);
                assert.deepStrictEqual(data.name, newName);
                assert.deepStrictEqual(data.key, newKey);
                done();
            });
        });

        it('update a project doesn\'t modify its backlog', (done) => {
            projectService.updateProject(id, newName, newKey).then((data) => {
                assert(!data.isNew);
                assert.deepStrictEqual(data.backlog.currentUSId, backlog.currentUSId);
                done();
            });
        });
    });

    describe('TTES-07 List Projects', () => {
        let backlog = new Backlog({sprint: [], userStories: []});
        const name1 = "project one", name2 = "project 2";
        const key1 = "KEY1", key2 = "KEY2";

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



