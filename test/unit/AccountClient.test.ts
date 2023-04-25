import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as sinon from "sinon";
import {InternalServerError} from "../../src/client/errors/Errors";
import * as dotenv from "dotenv";
dotenv.config();

const packageJson = require("../../package.json");
const clientVersion = packageJson.version;

describe("AccountClient", () => {
    let client: postmark.AccountClient;
    const accountToken: any = process.env.ACCOUNT_API_TOKEN;
    const serverToken: any = process.env.SERVER_API_TOKEN;

    beforeEach(() => {
        client = new postmark.AccountClient(accountToken);
    });

    describe("#new", () => {
        it("default clientOptions", () => {
            expect(client.getClientOptions()).to.eql({
                useHttps: true,
                requestHost: "api.postmarkapp.com",
                timeout: 180,
            });
        });

        it("clientVersion", () => {
            expect(client.clientVersion).to.equal(clientVersion);
        });

        it("httpClient initialized", () => {
            expect(client.httpClient.client.defaults).not.to.eql(180000);
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
      const https: boolean = false;
      client.setClientOptions({useHttps: https});

      expect(client.getClientOptions()).to.eql({
        useHttps: https,
        requestHost: "api.postmarkapp.com",
        timeout: 180,
      });
    });

    it("set clientOptions requestHost", () => {
        const host: string = "test.com";
        client.setClientOptions({requestHost: host});

        expect(client.getClientOptions()).to.eql({
            useHttps: true,
            requestHost: host,
            timeout: 180,
        });
    });

    describe("invalid requests", () => {
        it("empty token", () => {
            expect(() => new postmark.AccountClient(""))
                .to.throw("A valid API token must be provided.");
        });

        describe("httpRequest errors", () => {
            const errorType = "InternalServerError";
            const rejectError = new InternalServerError("response", 500, 500);
            let sandbox: sinon.SinonSandbox;

            beforeEach(() => {
                sandbox = sinon.createSandbox();
            });

            afterEach(() => {
                sandbox.restore();
            });

            it("promise error",() => {
                client = new postmark.AccountClient(serverToken);
                sandbox.stub(client.httpClient, "httpRequest").rejects(rejectError);

                return client.getSenderSignatures().then((result) => {
                    throw Error(`Should not be here with result: ${result}`);
                }, (error) => {
                    expect(error.name).to.equal(errorType);
                });
            });

            it("callback error",(done) => {
                client = new postmark.AccountClient("testToken");
                sandbox.stub(client.httpClient, "httpRequest").rejects(rejectError);

                client.getSenderSignatures(undefined, (error: any, data) => {
                    expect(data).to.equal(null);
                    expect(error.name).to.equal(errorType);
                    done();
                });
            });
        });
    });

    describe("valid requests", () => {
        describe("httpRequest", () => {
            const errorType = "InternalServerError";
            const rejectError = new InternalServerError("response", 500, 500);
            let sandbox: sinon.SinonSandbox;

            beforeEach(() => {
                sandbox = sinon.createSandbox();
            });

            afterEach(() => {
                sandbox.restore();
            });

            it("promise result",() => {
                const successMessage = "success!"
                client = new postmark.AccountClient(serverToken);
                sandbox.stub(client.httpClient, "httpRequest").resolves(successMessage);

                return client.getSenderSignatures().then((result) => {
                    expect(result).to.equal(successMessage)
                }, (error) => {
                    throw Error(`Should not be here with error: ${error}`);
                });
            });

            it("callback result",(done) => {
                const successMessage = "success!"
                sandbox.stub(client.httpClient, "httpRequest").resolves(successMessage);

                client.getSenderSignatures(undefined, (error: any, data) => {
                    expect(data).to.equal(successMessage);
                    expect(error).to.equal(null);
                    done();
                });
            });

            it("callback called once", async() => {
                const callback = sinon.spy();
                sandbox.stub(client.httpClient, "httpRequest").resolves("test");

                await client.getSenderSignatures(undefined, callback);
                expect(callback.calledOnce).to.be.true
            });
        });
    });
});
