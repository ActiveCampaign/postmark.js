import { ServerClient } from '../../src/index'
import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Bounce', () => {
    const serverToken = testingKeys.get('SERVER_TOKEN');

    it('getBounces', async() => {
        const client = new ServerClient(serverToken);
        const result = await client.getBounces();
        expect(result.TotalCount).to.be.gte(0);
    });
});