const assert = require('assert');
const dodsService = require('../../../src/services/dodService');
const dbConfig = require('../../../config/db');
const DoD = require('../../../src/models/dod');
const Project = require('../../../src/models/project');

function testCatchAddDod(done, project, name, rulesNames){
    dodsService.addDod(project, name, rulesNames)
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

function testCatchUpdateDod(done, updatedDod, expectedDod ) {
    dodsService.updateDod(updatedDod._id, updatedDod.name, updatedDod.rules).catch(() => {
        DoD.findById(updatedDod._id).then((dod) => {
            assert.deepStrictEqual(dod.name, expectedDod.name);
            assert.deepStrictEqual(dod.rules.toString(), expectedDod.rules.toString());
            done();
        });
    });
}


describe('DoDs Service', () => {
    const name = 'mocha DoD Test';
    const rulesNames = ['rule number 1', 'rule number 2'];
    const newName = 'mocha DoD Test';
    const newRulesNames = ['rule number 1', 'rule number 2'];
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
            testThenAddDod(done, project, name, rulesNames);
        });
    });
    describe('Tests needing a dod in db', () => {
        let dodId;
        const expectedDod = { name: newName, rules: newRulesNames};
        beforeEach('add dod in db', async () => {
            const dod = new DoD({name: name, rules: rulesNames});
            await dod.save();
            dodId = dod._id;
        });

        describe('TTES-51 Update DoD', () => {
            it('updates a dod', async() => {
                const updatedDod = await dodsService.updateDod(dodId, newName, newRulesNames);
                assert.deepStrictEqual(updatedDod.name, newName);
                assert.deepStrictEqual(updatedDod.rules.toString(), newRulesNames.toString());
            });

            it('cannot update a dod with a wrong _id', (done) => {
                dodsService.updateDod(null, newName, newRulesNames).catch(() => {
                    done();
                });
            });

            it('cannot update a dod with a no rules', (done) => {
                const updatedDod = {_id:dodId, name:newName, rules: null};
                testCatchUpdateDod(done, updatedDod, expectedDod);
            });

            it('cannot update a dod with a no name', (done) => {
                const updatedDod = {_id:dodId, name:null, rules: rulesNames};
                testCatchUpdateDod(done, updatedDod, expectedDod);
            });
        });
    });

});
