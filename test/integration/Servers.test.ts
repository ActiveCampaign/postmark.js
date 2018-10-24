import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Servers', function() {
    const accountToken: string = testingKeys.get('ACCOUNT_TOKEN');
    const client: postmark.AccountClient = new postmark.AccountClient(accountToken);
    const serverNamePrefix: string = 'node-js-test-server';

    function serverToTest():postmark.Models.ServerOptions {
        return { Name: `${serverNamePrefix}-${Date.now()}`};
    };

    async function cleanup() {
        let client:postmark.AccountClient = new postmark.AccountClient(accountToken);
        const servers: postmark.Models.Servers = await client.getServers();

        for (let i = 0; i < servers.Servers.length; i++) {
            let server:postmark.Models.Server = servers.Servers[i];
            if (server.Name.includes(serverNamePrefix)) { await client.deleteServer(server.ID) }
        };
    };

    before(cleanup);
    after(cleanup);

    it('getServers', async() => {
        const servers: postmark.Models.Servers = await client.getServers();
        expect(servers.TotalCount).to.gte(1);
    });

    it("createServer", async () => {
        const serverOptions: postmark.Models.ServerOptions = serverToTest();
        const serverDetails: postmark.Models.Server = await client.createServer(serverOptions);
        expect(serverDetails.Name).to.equal(serverOptions.Name);
    });

    it('editServer', async() => {
        let serverOptions: postmark.Models.ServerOptions = { Color: 'red'};
        let updatedServerOptions: postmark.Models.ServerOptions = { Color: 'green'};

        const servers: postmark.Models.Servers = await client.getServers();
        const server:postmark.Models.Server = servers.Servers[0];

        let result: postmark.Models.Server = await client.editServer(server.ID, serverOptions);
        expect(result.Color).to.eq(serverOptions.Color);

        result = await client.editServer(server.ID, updatedServerOptions);
        expect(result.Color).to.eq(updatedServerOptions.Color);
    });

    it("deleteServer", async () => {
        const serverDetails: postmark.Models.Server = await client.createServer(serverToTest());
        const result: postmark.Models.DefaultResponse = await client.deleteServer(serverDetails.ID);
        expect(result.Message.length).to.gte(1);
    });
});