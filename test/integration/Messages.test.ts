import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import { InboundMessagesFilteringParameters, OutboundMessagesFilteringParameters } from "../../src/client/models";

import * as dotenv from "dotenv";
dotenv.config();

describe("Client - Message Statistics", () => {
    const serverToken: any = process.env.SERVER_API_TOKEN;
    const client = new postmark.ServerClient(serverToken);
    const filter = new OutboundMessagesFilteringParameters(1, 0);
    const fromAddress: any = process.env.SENDER_EMAIL_ADDRESS;
    const toAddress: any = process.env.RECIPIENT_EMAIL_ADDRESS;

    it("getOutboundMessages", async () => {
        const messages = await client.getOutboundMessages(filter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.Messages.length).to.be.gte(0);
    });

    it("getOutboundMessageDetails", async function () {
        // Ensure we have a MessageID to test details retrieval against.
        // Using sendEmail avoids relying on pre-existing message history in the server.
        if (!fromAddress || !toAddress) {
            this.skip();
            return;
        }

        const sendResponse = await client.sendEmail(
            new postmark.Models.Message(fromAddress, "SDK integration test", "Test html body", undefined, toAddress),
        );

        expect(sendResponse.MessageID.length).to.be.gt(0);

        const details = await client.getOutboundMessageDetails(sendResponse.MessageID);
        expect(details.MessageID).to.equal(sendResponse.MessageID);
    });

    const inboundFilter = new InboundMessagesFilteringParameters(1, 0);

    it("getInboundMessages", async () => {
        const messages = await client.getInboundMessages(inboundFilter);
        expect(messages.TotalCount).to.be.gte(0);
        expect(messages.InboundMessages.length).to.be.gte(0);
    });

    it("getInboundMessageDetails", async function () {
        const messages = await client.getInboundMessages(inboundFilter);
        expect(messages.TotalCount).to.be.gte(0);
        if (!messages.InboundMessages || messages.InboundMessages.length === 0) {
            this.skip();
            return;
        }

        const messageId = messages.InboundMessages[0].MessageID;
        expect(messageId.length).to.above(0);

        const details = await client.getInboundMessageDetails(messageId);
        expect(details.MessageID).to.equal(messageId);
    });
});
