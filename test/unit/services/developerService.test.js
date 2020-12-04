const assert = require('assert');
const dbConfig = require('../../../config/db');
const developerService = require('../../../src/services/developerService');
const Developer = require('../../../src/models/developer');



describe('Developer service', () => {
    const username = 'username';

    before('connect', function(){
        dbConfig.connectToDB();
    });

    beforeEach('empty db', async () => {
        await Developer.deleteMany({});
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
});
