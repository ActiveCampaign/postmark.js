import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import { ClientOptions } from "../../src/client/models";

describe("ServerClient - Bulk Email", () => {
    const serverToken = "testServerToken";
    let client: postmark.ServerClient;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        client = new postmark.ServerClient(serverToken);
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    function buildRequest(): postmark.BulkEmailRequest {
        return new postmark.BulkEmailRequest(
            "sender@example.com",
            [
                new postmark.BulkEmailMessage("receiver1@example.com", { FirstName: "Bob" }),
                new postmark.BulkEmailMessage("receiver2@example.com", { FirstName: "Frieda" }, "cc@example.com"),
            ],
            "This is a bulk email for {{FirstName}}",
            "<html><body>Hi, {{FirstName}}</body></html>",
            "Hi, {{FirstName}}",
        );
    }

    describe("sendBulkEmail", () => {
        it("issues a POST to /email/bulk with the request as the body", async () => {
            const stub = sandbox.stub(client.httpClient, "httpRequest").resolves({
                Id: "f24af63c-533d-4b7a-ad65-4a7b3202d3a7",
                Status: "Accepted",
                SubmittedAt: "2024-03-17T07:25:01.4178645-05:00",
            });
            const request = buildRequest();

            const response = await client.sendBulkEmail(request);

            expect(stub.calledOnce).to.be.true;
            const [method, path, query, body] = stub.firstCall.args;
            expect(method).to.equal(ClientOptions.HttpMethod.POST);
            expect(path).to.equal("/email/bulk");
            expect(query).to.eql({});
            expect(body).to.equal(request);

            expect(response.Id).to.equal("f24af63c-533d-4b7a-ad65-4a7b3202d3a7");
            expect(response.Status).to.equal("Accepted");
        });

        it("passes the response to a supplied callback", (done) => {
            sandbox.stub(client.httpClient, "httpRequest").resolves({
                Id: "id",
                Status: "Accepted",
                SubmittedAt: "2024-03-17T07:25:01.4178645-05:00",
            });

            client.sendBulkEmail(buildRequest(), (error, data) => {
                expect(error).to.equal(null);
                expect(data).to.not.equal(null);
                expect((data as postmark.Models.BulkEmailSendingResponse).Id).to.equal("id");
                done();
            });
        });
    });

    describe("getBulkEmailStatus", () => {
        it("issues a GET to /email/bulk/{bulkRequestId} with no body", async () => {
            const bulkRequestId = "dc5e5d98-c073-4c97-8ee5-f897dfd28b47";
            const stub = sandbox.stub(client.httpClient, "httpRequest").resolves({
                Id: bulkRequestId,
                SubmittedAt: "2024-07-22T15:39:49.3723691Z",
                TotalMessages: 1,
                PercentageCompleted: 1,
                Status: "Completed",
                Subject: "Hello",
            });

            const response = await client.getBulkEmailStatus(bulkRequestId);

            expect(stub.calledOnce).to.be.true;
            const [method, path, query, body] = stub.firstCall.args;
            expect(method).to.equal(ClientOptions.HttpMethod.GET);
            expect(path).to.equal(`/email/bulk/${bulkRequestId}`);
            expect(query).to.eql({});
            expect(body).to.equal(null);

            expect(response.Id).to.equal(bulkRequestId);
            expect(response.Status).to.equal("Completed");
            expect(response.TotalMessages).to.equal(1);
            expect(response.PercentageCompleted).to.equal(1);
        });
    });

    describe("BulkEmailRequest model", () => {
        it("nests shared content and per-recipient messages", () => {
            const request = buildRequest();

            expect(request.From).to.equal("sender@example.com");
            expect(request.Subject).to.equal("This is a bulk email for {{FirstName}}");
            expect(request.Messages).to.have.length(2);
            expect(request.Messages[0].To).to.equal("receiver1@example.com");
            expect(request.Messages[0].TemplateModel).to.eql({ FirstName: "Bob" });
            expect(request.Messages[1].Cc).to.equal("cc@example.com");
        });

        it("supports optional shared fields", () => {
            const request = buildRequest();
            request.MessageStream = "broadcast";
            request.Tag = "Newsletter";
            request.TrackOpens = true;
            request.TrackLinks = postmark.Models.LinkTrackingOptions.HtmlAndText;

            expect(request.MessageStream).to.equal("broadcast");
            expect(request.Tag).to.equal("Newsletter");
            expect(request.TrackOpens).to.equal(true);
            expect(request.TrackLinks).to.equal(postmark.Models.LinkTrackingOptions.HtmlAndText);
        });
    });
});
