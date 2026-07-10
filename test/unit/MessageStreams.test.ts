import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import { ClientOptions } from "../../src/client/models";

describe("ServerClient - Message Stream archive", () => {
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

    describe("archiveMessageStream", () => {
        it("issues a POST to /message-streams/{id}/archive with an empty body", async () => {
            const stub = sandbox.stub(client.httpClient, "httpRequest").resolves({
                ID: 1,
                ServerID: 1,
                ExpectedPurgeDate: "2024-01-01T00:00:00Z",
            });

            const response = await client.archiveMessageStream("broadcasts");

            expect(stub.calledOnce).to.be.true;
            const [method, path, query, body] = stub.firstCall.args;
            expect(method).to.equal(ClientOptions.HttpMethod.POST);
            expect(path).to.equal("/message-streams/broadcasts/archive");
            expect(query).to.eql({});
            expect(body).to.eql({});

            expect(response.ExpectedPurgeDate).to.equal("2024-01-01T00:00:00Z");
        });

        it("passes the response to a supplied callback", (done) => {
            sandbox.stub(client.httpClient, "httpRequest").resolves({
                ID: 1,
                ServerID: 1,
                ExpectedPurgeDate: "2024-01-01T00:00:00Z",
            });

            client.archiveMessageStream("broadcasts", (error, data) => {
                expect(error).to.equal(null);
                expect(data).to.not.equal(null);
                done();
            });
        });
    });
});
