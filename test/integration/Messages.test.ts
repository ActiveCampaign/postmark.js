import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import { InboundMessagesFilteringParameters, OutboundMessagesFilteringParameters } from "../../src/client/models";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Message Statistics", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);
    const filter = new OutboundMessagesFilteringParameters(1, 0);

    it("getOutboundMessages", async () => {
        const messages = await client.getOutboundMessages(filter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.Messages.length).to.be.gte(0);
    });

    it("getOutboundMessageDetails", async () => {
        const messages = await client.getOutboundMessages(filter);
        expect(messages.Messages[0].MessageID.length).to.be.gt(0);
    });

    const inboundFilter = new InboundMessagesFilteringParameters(1, 0);

    it("getInboundMessages", async () => {
        const messages = await client.getInboundMessages(inboundFilter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages.length).to.be.gte(0);
    });

    it("getInboundMessageDetails", async () => {
        const messages = await client.getInboundMessages(inboundFilter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages[0].MessageID.length).to.above(0);
    });
});
