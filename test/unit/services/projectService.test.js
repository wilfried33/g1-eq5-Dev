process.env.NODE_ENV = 'test';

const assert = require('assert');
const projectService = require('../../../src/services/projectService');
const dbConfig = require('../../../config/db');
const Project = require('../../../src/models/project');
const Backlog = require('../../../src/models/backlog');

function testCatchAdd(done, key, name){
    projectService.addProject(key, name)
        .catch(() => {
            Project.countDocuments((err, count) => {
                assert.deepStrictEqual(count, 0);
                done();
            });
        });
}

function testCatchUpdate(done, id, name, objId, objKey, objName){
    projectService.updateProject(id, name)
        .catch(() => {
            Project.findOne({name: objName})
                .then((p) => {
                    assert.deepStrictEqual(p._id, objId);
                    assert.deepStrictEqual(p.name, objName);
                    assert.deepStrictEqual(p.key, objKey);
                    done();
                });
        });
}


describe('Projects service', () => {
    const name = 'mochatest';
    const key = 'MTES';

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', (done) => {
        Project.deleteMany({}).then(() => done());
    });

    describe('TTES-01 Create Project', () => {
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
        let backlog = new Backlog({sprint: [], userStories: [], currentUSId: 16});
        const newName = 'newName';

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
            testCatchUpdate(done, null, null, id, key, name);
        });
        it('cannot update a project with no id', (done) => {
            testCatchUpdate(done, null, newName, id, key, name);
        });
        it('cannot update a project with no name', (done) => {
            testCatchUpdate(done, id, null, id, key, name);
        });
        it('cannot update a project with invalid id', (done) => {
            testCatchUpdate(done, 0, newName, id, key, name);
        });
        it('update a project', (done) => {
            projectService.updateProject(id, newName).then((data) => {
                assert(!data.isNew);
                assert.deepStrictEqual(data._id, id);
                assert.deepStrictEqual(data.name, newName);
                assert.deepStrictEqual(data.key, key);
                done();
            });
        });
        it('update a project doesn\'t modify its backlog', (done) => {
            projectService.updateProject(id, newName).then((data) => {
                assert(!data.isNew);
                assert.deepStrictEqual(data.backlog.currentUSId, backlog.currentUSId);
                done();
            });
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



