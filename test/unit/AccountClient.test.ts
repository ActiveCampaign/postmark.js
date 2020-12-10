import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
import * as sinon from "sinon";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

const packageJson = require("../../package.json");
const clientVersion = packageJson.version;

describe("AccountClient", () => {
    let client: postmark.AccountClient;
    const accountToken: string = testingKeys.get("ACCOUNT_API_TOKEN");
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");

    beforeEach(() => {
        client = new postmark.AccountClient(accountToken);
    });

    describe("#new", () => {
        it("default clientOptions", () => {
            expect(client.getClientOptions()).to.eql({
                useHttps: true,
                requestHost: "api.postmarkapp.com",
                timeout: 60,
            });
        });

        it("clientVersion", () => {
            expect(client.clientVersion).to.equal(clientVersion);
        });
    });

    it("clientVersion=", () => {
        const customClientVersion: string = "test";

        client.clientVersion = customClientVersion;
        expect(client.clientVersion).to.equal(customClientVersion);
    });

    it("clientOptions=", () => {
        const requestHost = "test";
        const useHttps = false;
        const timeout = 10;
        client.setClientOptions({requestHost, useHttps, timeout});

        expect(client.getClientOptions()).to.eql({
            useHttps,
            requestHost,
            timeout,
        });
    });

    describe("errors", () => {
        it("empty token", () => {
            expect(() => new postmark.AccountClient(""))
                .to.throw("A valid API token must be provided.");
        });

        describe("request errors", () => {
            const errorType = "InternalServerError";
            const rejectError = {response: {status: 500, data: "response"}};
            let sandbox: sinon.SinonSandbox;

            beforeEach(() => {
                sandbox = sinon.createSandbox();
            });

            afterEach(() => {
                sandbox.restore();
            });

            it("promise error", () => {
                client = new postmark.AccountClient(serverToken);
                sandbox.stub(client.httpClient, "request").rejects(rejectError);

                return client.getSenderSignatures().then((result) => {
                    throw Error(`Should not be here with result: ${result}`);
                }, (error) => {
                    expect(error.name).to.equal(errorType);
                });
            });

            it("callback error", (done) => {
                client = new postmark.AccountClient("testToken");
                sandbox.stub(client.httpClient, "request").rejects(rejectError);

                client.getSenderSignatures(undefined, (error: any, data) => {
                    expect(data).to.equal(null);
                    expect(error.name).to.equal(errorType);
                    done();
                });
            });
        });
    });
});
