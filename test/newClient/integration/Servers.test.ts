import * as postmark from '../../../src/index'
import { expect } from 'chai';
import 'mocha';
import Servers from "../../../src/client/models/server/Servers";
import {Server, ServerOptions} from "../../../src/client/models";
import DefaultResponse from "../../../src/client/models/client/PostmarkResponse";

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Servers', function() {
    this.timeout(5000);

    let client:postmark.AccountClient;
    const accountToken:string = testingKeys.get('ACCOUNT_TOKEN');
    const serverNamePrefix: string = 'node-js-test-server';

    function serverToTest(name: string) {
        return `${serverNamePrefix}-${name}`
    }

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

    beforeEach(function () {
        client = new postmark.AccountClient(accountToken);
    });

    it('getServers', async() => {
        const servers: Servers = await client.getServers();
        expect(servers.TotalCount).to.gte(1);
    });

    it("createServer", async () => {
        const name: string = serverToTest('create-test-servers');
        const serverDetails: Server = await client.createServer({Name: name});
        expect(serverDetails.Name).to.equal(name);
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
        const name: string = serverToTest('delete-test-servers');
        const serverDetails: Server = await client.createServer({Name: name});
        const result: DefaultResponse = await client.deleteServer(serverDetails.ID);
        expect(result.Message.length).to.gte(1);
    });
});