import { ServerClient } from '../../../src/index'
import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Bounce', () => {
    let client:ServerClient;
    const serverToken:string = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new ServerClient(serverToken);
    });

    it('getBounce', async() => {
        const bounces = await client.getBounces();
        const bounce = await client.getBounce(bounces.Bounces[0].ID);
        expect(bounce.ID).to.be.gte(0);
    });

    it('getBounces', async() => {
        const result = await client.getBounces();
        expect(result.TotalCount).to.be.gte(0);
    });

    it('getBounceBump', async() => {
        const bounces = await client.getBounces();
        const bounce = await client.getBounceDump(bounces.Bounces[0].ID);
        expect(bounce.Body).to.be.string;
    });

    it('getBounceTags', async() => {
        const tags = await client.getBounceTags();
        expect(tags.length).to.be.gte(0);
    });
});