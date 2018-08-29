import { ServerClient } from '../../../src/index'
import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Client - Message Statistics', () => {
    let client:ServerClient;
    const serverToken:string = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new ServerClient(serverToken);
    });

    it('getOutboundMessages', async() => {
        const messages = await client.getOutboundMessages({count:1});
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.Messages.length).to.be.gte(0);
    });

    it('getOutboundMessageDetails', async() => {
        const messages = await client.getOutboundMessages({count:1});
        expect(messages.Messages[0].MessageID).to.be.string;
    });

    it('getInboundMessages', async() => {
        const messages = await client.getInboundMessages({count:1});
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages.length).to.be.gte(0);
    });

    it('getInboundMessageDetails', async() => {
        const messages = await client.getInboundMessages({count:1});
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages[0].MessageID).to.be.string;
    });

});