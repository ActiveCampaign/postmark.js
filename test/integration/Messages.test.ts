import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Client - Message Statistics', function() {
    const serverToken:string = testingKeys.get('SERVER_TOKEN');
    const client:postmark.ServerClient = new postmark.ServerClient(serverToken);

    it('getOutboundMessages', async() => {
        const messages: postmark.DataTypes.OutboundMessages = await client.getOutboundMessages({count:1});
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.Messages.length).to.be.gte(0);
    });

    it('getOutboundMessageDetails', async() => {
        const messages: postmark.DataTypes.OutboundMessages = await client.getOutboundMessages({count:1});
        expect(messages.Messages[0].MessageID).to.be.string;
    });

    it('getInboundMessages', async() => {
        const messages: postmark.DataTypes.InboundMessages = await client.getInboundMessages({count:1});
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages.length).to.be.gte(0);
    });

    it('getInboundMessageDetails', async() => {
        const messages: postmark.DataTypes.InboundMessages = await client.getInboundMessages({count:1});
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages[0].MessageID.length).to.above(0);
    });
});