import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as dotenv from "dotenv";
dotenv.config();

describe("Sending", () => {
    const serverToken: any = process.env.SERVER_API_TOKEN;
    const client = new postmark.ServerClient(serverToken);

    const fromAddress: any = process.env.SENDER_EMAIL_ADDRESS;
    const toAddress: any = process.env.RECIPIENT_EMAIL_ADDRESS;

    function messageToSend() {
        return new postmark.Models.Message(fromAddress, "Test subject", "Test html body", undefined, toAddress);
    }

    it("sendEmail", async () => {
        const response = await client.sendEmail(messageToSend());
        expect(response.Message).to.equal("OK");
    });

    it("sendEmailBatch", async () => {
        const messages = Array.from({ length: 3 }, () => messageToSend());
        const responses = await client.sendEmailBatch(messages);

        expect(responses[0].Message).to.equal("OK");
        expect(responses.length).to.equal(3);
    });

    describe("bulk", () => {
        function bulkRequest(recipientCount: number) {
            const messages = Array.from({ length: recipientCount }, () =>
                new postmark.BulkEmailMessage(toAddress, { name: "Test" }));

            const request = new postmark.BulkEmailRequest(
                fromAddress, messages, "Test bulk subject",
                "<html><body>Test html body</body></html>", "Test text body");
            request.MessageStream = "broadcast";
            return request;
        }

        it("sendBulkEmail", async () => {
            const response = await client.sendBulkEmail(bulkRequest(2));

            expect(response.Status).to.equal("Accepted");
            expect(response.Id).to.be.a("string");
        });

        it("getBulkEmailStatus", async () => {
            const sent = await client.sendBulkEmail(bulkRequest(1));
            const status = await client.getBulkEmailStatus(sent.Id);

            expect(status.Id).to.equal(sent.Id);
            expect(status.TotalMessages).to.be.a("number");
        });
    });

    describe("invalid", () => {
        it("sendEmail", () => {
            const message = messageToSend();
            message.HtmlBody = undefined;

            return client.sendEmail(message).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }).catch((error) => {
                expect(error.name).to.equal("InvalidEmailRequestError");
            });
        });
    });
});
