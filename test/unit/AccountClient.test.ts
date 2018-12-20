import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

const packageJson = require("../../package.json");
const clientVersion = packageJson.version;

describe("AccountClient", () => {
    let client: postmark.AccountClient;
    const accountToken: string = testingKeys.get("ACCOUNT_TOKEN");

    beforeEach(() => {
        client = new postmark.AccountClient(accountToken);
    });

    describe("#new", () => {
        it("default clientOptions", () => {
            expect(client.clientOptions).to.eql({
                useHttps: true,
                requestHost: "api.postmarkapp.com",
                timeout: 30,
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

        client.clientOptions.requestHost = requestHost;
        client.clientOptions.useHttps = useHttps;
        client.clientOptions.timeout = timeout;

        expect(client.clientOptions).to.eql({
            useHttps,
            requestHost,
            timeout,
        });
    });

    describe("errors", () => {
        const invalidTokenError = "InvalidAPIKeyError";

        it("empty token", () => {
            expect(() => new postmark.AccountClient(""))
                .to.throw("A valid API token must be provided when creating a ClientOptions");
        });

        it("promise error", () => {
            client = new postmark.AccountClient("testToken");
            return client.getSenderSignatures().then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error.name).to.equal(invalidTokenError);
            });
        });

        it("callback error", (done) => {
            client = new postmark.AccountClient("testToken");
            client.getSenderSignatures(undefined, (error: any, data) => {
                expect(data).to.equal(null);
                expect(error.name).to.equal(invalidTokenError);
                done();
            });
        });
    });
});
