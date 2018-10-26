import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({ file: __dirname + '/../../testing_keys.json' });

describe('Bounce', function () {
    const serverToken: string = testingKeys.get('SERVER_TOKEN');
    const client = new postmark.ServerClient(serverToken);

    it('getBounce', async () => {
        const bounces = await client.getBounces();
        const bounce = await client.getBounce(bounces.Bounces[0].ID);
        expect(bounce.ID).to.be.gte(0);
    });

    describe('invalid', function () {
        it('getBounce', () => {
            return client.getBounces({ count: -1, offset: 0 }).catch(error => {
                expect(error.name).to.eq('ApiInputError');
            });
        });
    });

    it('getBounces', async () => {
        const bounces = await client.getBounces();
        expect(bounces.TotalCount).to.be.gte(0);
    });

    it('getBounceBump', async () => {
        const bounces = await client.getBounces();
        const bounceDump = await client.getBounceDump(bounces.Bounces[0].ID);
        expect(bounceDump.Body).to.be.string;
    });

    it('getBounceTags', async () => {
        const tags: string[] = await client.getBounceTags();
        expect(tags.length).to.be.gte(0);
    });
});