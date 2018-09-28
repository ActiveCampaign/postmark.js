import * as postmark from '../../../src/index'
import {Servers, Server, ServerOptions, DefaultResponse} from "../../../src/client/models";

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Servers', function() {
    const accountToken:string = testingKeys.get('ACCOUNT_TOKEN');
    const client:postmark.AccountClient = new postmark.AccountClient(accountToken);
    const serverNamePrefix: string = 'node-js-test-server';

    function serverToTest():ServerOptions {
        return { Name: `${serverNamePrefix}-${Date.now()}`};
    };

    async function cleanup() {
        let client = new postmark.AccountClient(accountToken);
        const servers: Servers = await client.getServers();

        for (let i = 0; i < servers.Servers.length; i++) {
            let server = servers.Servers[i];
            if (server.Name.includes(serverNamePrefix)) { await client.deleteServer(server.ID) }
        };
    };

    before(cleanup);
    after(cleanup);

    it('getServers', async() => {
        const servers: Servers = await client.getServers();
        expect(servers.TotalCount).to.gte(1);
    });

    it("createServer", async () => {
        const serverOptions: ServerOptions = serverToTest();
        const serverDetails: Server = await client.createServer(serverOptions);
        expect(serverDetails.Name).to.equal(serverOptions.Name);
    });

    it('editServer', async() => {
        let serverOptions: ServerOptions = { Color: 'red'};
        let updatedServerOptions: ServerOptions = { Color: 'green'};

        const servers: Servers = await client.getServers();
        const server:Server = servers.Servers[0];

        let result: Server = await client.editServer(server.ID, serverOptions);
        expect(result.Color).to.eq(serverOptions.Color);

        result = await client.editServer(server.ID, updatedServerOptions);
        expect(result.Color).to.eq(updatedServerOptions.Color);
    });

    it("deleteServer", async () => {
        const serverDetails: Server = await client.createServer(serverToTest());
        const result: DefaultResponse = await client.deleteServer(serverDetails.ID);
        expect(result.Message.length).to.gte(1);
    });
});