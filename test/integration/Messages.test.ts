import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';
import { OutboundMessagesFilteringParameters, InboundMessagesFilteringParameters } from '../../src/client/models';

const nconf = require('nconf');
const testingKeys = nconf.env().file({ file: __dirname + '/../../testing_keys.json' });

describe('Client - Message Statistics', function () {
    const serverToken: string = testingKeys.get('SERVER_TOKEN');
    const client = new postmark.ServerClient(serverToken);
    var filter = new OutboundMessagesFilteringParameters(1, 0);

    it('getOutboundMessages', async () => {
        const messages = await client.getOutboundMessages(filter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.Messages.length).to.be.gte(0);
    });

    it('getOutboundMessageDetails', async () => {
        const messages = await client.getOutboundMessages(filter);
        expect(messages.Messages[0].MessageID).to.be.string;
    });

    var inboundFilter = new InboundMessagesFilteringParameters(1, 0);

    it('getInboundMessages', async () => {
        const messages = await client.getInboundMessages(inboundFilter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages.length).to.be.gte(0);
    });

    it('getInboundMessageDetails', async () => {
        const messages = await client.getInboundMessages(inboundFilter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages[0].MessageID.length).to.above(0);
    });
});