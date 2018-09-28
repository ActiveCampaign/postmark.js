import * as postmark from '../../../src/index'
import {Server, ServerOptions} from "../../../src/client/models";

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Server', function() {
    const serverToken:string = testingKeys.get('SERVER_TOKEN');
    const client:postmark.ServerClient = new postmark.ServerClient(serverToken);

    it('getServer', async() => {
        const server: Server = await client.getServer();
        expect(server.ID).to.above(0);
    });

    it('editServer', async() => {
        let serverOptions: ServerOptions = { Color: 'red'};
        let updatedServerOptions: ServerOptions = { Color: 'green'};

        let server: Server = await client.editServer(serverOptions);
        expect(server.Color).to.eq(serverOptions.Color);

        server = await client.editServer(updatedServerOptions);
        expect(server.Color).to.eq(updatedServerOptions.Color);
    });
});
