const assert = require('assert');
const dodService = require('../../../src/services/dodService');
const db = require('../../../config/db');
const DoD = require('../../../src/models/dodTemplate');
const Project = require('../../../src/models/project');

describe('DoDs Template Service', () => {
    const name = 'mocha DoD Test';
    const rulesNames = ['rule number 1', 'rule number 2'];
    const newName = 'mocha DoD Test';
    const newRulesNames = ['rule number 1', 'rule number 2'];
    let project;

    before('connect', function(){
        db.connectToDB();
    });

    beforeEach('empty db', async () => {
        await db.emptyCollections();

        project = new Project({ name: 'mochatest', key: 'MTES'});
        await project.save();
    });

    describe('TTES-46 Create DoD template', () => {
        async function testCatchAddDod(project, name, rulesNames){
            try {
                await dodService.addDod(project, name, rulesNames);
            } catch (error) {
                const count = await DoD.countDocuments();
                assert.deepStrictEqual(count, 0);
                return;
            }
            assert(false);
        }

        async function testThenAddDod(project, name, ruleNames){
            const data = await dodService.addDod(project, name, ruleNames);
            assert(!data.isNew);
            const count = await DoD.countDocuments();
            assert.deepStrictEqual(count, 1);
        }

        it('cannot add an empty dod', async () => {
            await testCatchAddDod(null, null, null);
        });
        it('cannot create dod without name', async () => {
            await testCatchAddDod(project, null, null);
        });
        it('cannot create dod with no project', async () => {
            await testCatchAddDod(null, name, null);
        });
        it('creates a dod with no rules', async () => {
            await testThenAddDod(project, name, null);
        });
        it('creates a dod', async () => {
            await testThenAddDod(project, name, rulesNames);
        });
    });

    describe('Tests needing a dod in db', () => {
        let dodId;
        let expectedDod;

        beforeEach('add dod in db', async () => {
            const dod = new DoD({name: name, rules: rulesNames});
            await dod.save();
            dodId = dod._id;
            expectedDod = {
                _id:dodId,
                name: newName,
                rules: newRulesNames
            };
        });

        describe('TTES-51 Update DoD template', () => {
            async function testCatchUpdateDod(updatedDod, expectedDod ) {
                try {
                    await dodService.updateDod(updatedDod._id, updatedDod.name, updatedDod.rules);
                } catch (error) {
                    const dod = await DoD.findById(expectedDod._id);
                    assert.deepStrictEqual(dod.name, expectedDod.name);
                    assert.deepStrictEqual(dod.rules.toString(), expectedDod.rules.toString());
                    return;
                }
                assert(false);
            }

            it('updates a dod', async() => {
                const updatedDod = await dodService.updateDod(dodId, newName, newRulesNames);
                assert.deepStrictEqual(updatedDod.name, newName);
                assert.deepStrictEqual(updatedDod.rules.toString(), newRulesNames.toString());
            });

            it('cannot update a dod with a wrong _id', async () => {
                const updatedDod = {_id:'bebe<b<eb', name:newName, rules: rulesNames};
                await testCatchUpdateDod(updatedDod, expectedDod);
            });

            it('cannot update a dod with no rules', async () => {
                const updatedDod = {_id:dodId, name:newName, rules: null};
                await testCatchUpdateDod(updatedDod, expectedDod);
            });

            it('cannot update a dod with no name', async () => {
                const updatedDod = {_id:dodId, name:null, rules: rulesNames};
                await testCatchUpdateDod(updatedDod, expectedDod);
            });
        });
    });
});
