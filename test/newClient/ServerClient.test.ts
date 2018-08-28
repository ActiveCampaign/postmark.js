import { ServerClient } from '../../src/index'
import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const packageJson = require("../../package.json")
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});
const clientVersion = packageJson.version;

describe('ServerClient', () => {
    const serverToken = testingKeys.get('SERVER_TOKEN');

    describe('#new', () => {
        it('default client options', async() => {
            const client = new ServerClient(serverToken);
            expect(client.clientOptions).to.eql({
                useHttps: true,
                requestHost: 'api.postmarkapp.com',
                timeout: 30
            })
        });

        it('client version', async() => {
            const client = new ServerClient(serverToken);
            expect(client.clientVersion).to.equal(clientVersion);
        });
    });

});