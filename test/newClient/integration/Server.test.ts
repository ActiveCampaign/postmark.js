import { ServerClient } from '../../../src/index'
import { expect } from 'chai';
import 'mocha';
import {Server, ServerOptions} from "../../../src/client/models";

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Server', function() {
    this.timeout(5000);

    let client:ServerClient;
    const serverToken:string = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new ServerClient(serverToken);
    });

    it('getServer', async() => {
        const server: Server = await client.getServer();
        expect(server.ID).to.above(0);
    });

    it('editServer', async() => {
        let serverOptions: ServerOptions = { Color: 'red'};
        let updatedServerOptions: ServerOptions = { Color: 'green'};

        const server: Server = await client.getServer();
        let result: Server = await client.editServer(serverOptions);

        expect(result.Color).to.eq(serverOptions.Color);
        result = await client.editServer(updatedServerOptions);
        expect(result.Color).to.eq(updatedServerOptions.Color);
    });
});
