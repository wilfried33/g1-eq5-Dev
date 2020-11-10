const assert = require('assert');
const projectService = require('../../../src/services/projectService');
const dbConfig = require('../../../src/config/db');
const Project = require('../../../src/models/project');

before('connect', function(){
    dbConfig.connectToTestDB();
});

beforeEach('empty db', (done) => {
    Project.deleteMany({}).then(() => done());
});

const name = "mochatest";
const key = "MTES";

describe('Create Project', () => {
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

    it('cannot add same a project', (done) => {
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



