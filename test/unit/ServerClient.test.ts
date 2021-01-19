import * as postmark from "../../src/index";

import {expect} from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({file: __dirname + "/../../testing_keys.json"});

const packageJson = require("../../package.json");
const clientVersion = packageJson.version;
import * as sinon from "sinon";

describe("ServerClient", () => {
    let client: postmark.ServerClient;
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");

    beforeEach(() => {
        client = new postmark.ServerClient(serverToken);
    });

    describe("#new", () => {
        it("default clientOptions", () => {
            const defaultClientOptions = { useHttps: true, requestHost: "api.postmarkapp.com", timeout: 180 };
            expect(client.getClientOptions()).to.eql(defaultClientOptions);
        });

        it("clientVersion", () => {
            expect(client.clientVersion).to.equal(clientVersion);
        });
    });

    it("clientVersion=", () => {
        const customClientVersion = "test";
        client.clientVersion = customClientVersion;
        expect(client.clientVersion).to.equal(customClientVersion);
    });

    it("getComposedHttpRequestHeaders", () => {
        expect(client.getComposedHttpRequestHeaders()).to.eql({
            "X-Postmark-Server-Token": serverToken,
            "Accept": "application/json",
            "User-Agent": `Postmark.JS - ${clientVersion}`,
        });
    });

    describe("clientOptions", () => {
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

        it("set clientOptions timeout", () => {
          const timeoutValue: number = 10;
          client.setClientOptions({timeout: timeoutValue});

          expect(client.getClientOptions()).to.eql({
            useHttps: true,
            requestHost: "api.postmarkapp.com",
            timeout: timeoutValue,
          });
        });

        it("set clientOptions https", () => {
          client.setClientOptions({useHttps: false});

          expect(client.getClientOptions()).to.eql({
            useHttps: false,
            requestHost: "api.postmarkapp.com",
            timeout: 180,
          });
        });

        it("new clientOptions as object", () => {
            const requestHost = "test";
            const useHttps = false;
            const timeout = 50;
            const clientOptions = new postmark.Models.ClientOptions.Configuration(useHttps, requestHost, timeout);
            client = new postmark.ServerClient(serverToken, clientOptions);

            expect(client.getClientOptions()).to.eql({
                useHttps,
                requestHost,
                timeout,
            });
        });

        it("new clientOptions as parameter", () => {
            const requestHost = "test";
            const useHttps = false;
            const timeout = 50;

            client = new postmark.ServerClient(serverToken, {
                useHttps,
                requestHost,
                timeout,
            });

            expect(client.getClientOptions()).to.eql({
                useHttps,
                requestHost,
                timeout,
            });
        });

    });

    describe("requests", () => {
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        describe("callback", () => {
            it("process it when there are no errors", async() => {
                let callback = sinon.spy();
                sandbox.stub(client.httpClient, "request").returns(Promise.resolve("test"));

                await client.getServer(callback);
                expect(callback.calledOnce).to.be.true
            });

            it("process regular response based on request status", () => {
                sandbox.stub(client.httpClient, "request").returns(Promise.resolve("test"));

                return client.getServer().then((result) => {
                    expect(result).to.eq("test");
                }, (error) => {
                    throw Error(`Should not be here with error: ${error}`);
                });
            });
            
            it("process error response based on request status",  () => {
                sandbox.stub(client.httpClient, "request").rejects({response: {status: 600, data: "response"}});

                return client.getServer().then((result) => {
                    throw Error(`Should not be here with result: ${result}`);
                }, (error) => {
                    expect(error.name).to.eq("UnknownError");
                });
            });
        });
    });

});
