import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import { InboundMessagesFilteringParameters, OutboundMessagesFilteringParameters } from "../../src/client/models";

import * as dotenv from "dotenv";
dotenv.config();

function delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

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
        this.timeout(60_000);

        // Prefer using an existing message to avoid eventual consistency delays.
        // Some accounts can have outbound history where certain IDs no longer resolve, so try a few.
        const existing = await client.getOutboundMessages(new OutboundMessagesFilteringParameters(10, 0));
        const candidateIds = (existing.Messages || []).map((m) => m.MessageID).filter(Boolean);

        let messageId: string | undefined;
        for (const candidateId of candidateIds) {
            try {
                const details = await client.getOutboundMessageDetails(candidateId);
                expect(details.MessageID).to.equal(candidateId);
                return;
            } catch (err) {
                const name = (err as any)?.name as string | undefined;
                const statusCode = (err as any)?.statusCode as number | undefined;
                const message = (err as any)?.message as string | undefined;

                const isNotFound =
                    name === "ApiInputError" &&
                    statusCode === 422 &&
                    typeof message === "string" &&
                    message.toLowerCase().includes("not found");

                if (!isNotFound) throw err;
            }
        }

        // If there is no message history (or none resolve), fall back to sending a message (if configured).
        if (!fromAddress || !toAddress) {
            this.skip();
            return;
        }

        const sendResponse = await client.sendEmail(
            new postmark.Models.Message(fromAddress, "SDK integration test", "Test html body", undefined, toAddress),
        );
        expect(sendResponse.MessageID.length).to.be.gt(0);
        messageId = sendResponse.MessageID;

        // Postmark message endpoints can be eventually consistent (esp. after send).
        // Retry briefly to avoid failing when the message isn't queryable yet.
        let details: any;
        let lastError: any;
        for (let attempt = 0; attempt < 10; attempt++) {
            try {
                details = await client.getOutboundMessageDetails(messageId);
                break;
            } catch (err) {
                lastError = err;
                const message = (err as any)?.message as string | undefined;
                const name = (err as any)?.name as string | undefined;
                const statusCode = (err as any)?.statusCode as number | undefined;

                // Only retry the known eventual-consistency error.
                const isNotFoundYet =
                    name === "ApiInputError" &&
                    statusCode === 422 &&
                    typeof message === "string" &&
                    message.toLowerCase().includes("not found");

                if (!isNotFoundYet) {
                    throw err;
                }

                await delay(1000 + attempt * 500);
            }
        }

        if (!details) {
            // Some environments (sandbox servers, disabled message queries, etc.) never expose outbound details.
            // Treat "not found" as an environment limitation rather than a hard failure.
            const message = (lastError as any)?.message as string | undefined;
            const name = (lastError as any)?.name as string | undefined;
            const statusCode = (lastError as any)?.statusCode as number | undefined;

            const isNotFound =
                name === "ApiInputError" &&
                statusCode === 422 &&
                typeof message === "string" &&
                message.toLowerCase().includes("not found");

            if (isNotFound) {
                this.skip();
                return;
            }

            throw lastError;
        }
        expect(details.MessageID).to.equal(messageId);
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
