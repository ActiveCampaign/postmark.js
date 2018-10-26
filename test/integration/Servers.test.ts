import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';
import { CreateServerRequest, UpdateServerRequest } from '../../src/client/models';

const nconf = require('nconf');
const testingKeys = nconf.env().file({ file: __dirname + '/../../testing_keys.json' });

describe('Servers', function () {
    const accountToken: string = testingKeys.get('ACCOUNT_TOKEN');
    const client = new postmark.AccountClient(accountToken);
    const serverNamePrefix: string = 'node-js-test-server';

    function serverToTest() {
        return new CreateServerRequest(`${serverNamePrefix}-${Date.now()}`);
    };

    async function cleanup() {
        let client = new postmark.AccountClient(accountToken);
        const servers = await client.getServers();

        for (let i = 0; i < servers.Servers.length; i++) {
            let server = servers.Servers[i];
            if (server.Name.includes(serverNamePrefix)) { await client.deleteServer(server.ID) }
        };
    };

    before(cleanup);
    after(cleanup);

    it('getServers', async () => {
        const servers = await client.getServers();
        expect(servers.TotalCount).to.gte(1);
    });

    it("createServer", async () => {
        const serverOptions = serverToTest();
        const serverDetails = await client.createServer(serverOptions);
        expect(serverDetails.Name).to.equal(serverOptions.Name);
    });

    it('editServer', async () => {
        let serverOptions = new UpdateServerRequest(undefined, 'red');
        let updatedServerOptions = new UpdateServerRequest(undefined, 'green');

        const servers = await client.getServers();
        const server = servers.Servers[0];

        let result = await client.editServer(server.ID, serverOptions);
        expect(result.Color).to.eq(serverOptions.Color);

        result = await client.editServer(server.ID, updatedServerOptions);
        expect(result.Color).to.eq(updatedServerOptions.Color);
    });

    it("deleteServer", async () => {
        const serverDetails = await client.createServer(serverToTest());
        const result = await client.deleteServer(serverDetails.ID);
        expect(result.Message.length).to.gte(1);
    });
});