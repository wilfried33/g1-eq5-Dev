const assert = require('assert');
const dodsService = require('../../../src/services/dodService');
const dbConfig = require('../../../config/db');
const DoD = require('../../../src/models/dod');
const Project = require('../../../src/models/project');

function testCatchAddDod(done, project, name, ruleNames){
    dodsService.addDod(project, name, ruleNames)
        .catch(() => {
            DoD.countDocuments((_, count) => {
                assert.deepStrictEqual(count, 0);
                done();
            });
        });
}

function testThenAddDod(done, project, name, ruleNames){
    dodsService.addDod(project, name, ruleNames)
        .then((data) => {
            assert(!data.isNew);
            DoD.countDocuments((_, count) => {
                assert.deepStrictEqual(count, 1);
                done();
            });
        });
}


describe('DoDs Service', () => {
    const name = 'mocha DoD Test';
    const ruleNames = ['rule number 1', 'rule number 2'];
    let project;

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', async () => {
        await Project.deleteMany({});
        await DoD.deleteMany({});

        project = new Project({ name: 'mochatest', key: 'MTES'});
        await project.save();
    });

    describe('TTES-46 Create DoD', () => {
        it('cannot add an empty dod', (done) => {
            testCatchAddDod(done, null, null, null);
        });
        it('cannot create dod without name', (done) => {
            testCatchAddDod(done, project, null, null);
        });
        it('cannot create dod with no project', (done) => {
            testCatchAddDod(done, null, name, null);
        });
        it('creates a dod with no rules', (done) => {
            testThenAddDod(done, project, name, null);
        });
        it('creates a dod', (done) => {
            testThenAddDod(done, project, name, ruleNames);
        });
    });
});
