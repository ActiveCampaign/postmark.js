import * as postmark from "../../src/index";

import {expect} from "chai";
import "mocha";

import * as dotenv from "dotenv";
dotenv.config();

const packageJson = require("../../package.json");
const clientVersion = packageJson.version;
import * as sinon from "sinon";
import {InternalServerError} from "../../src/client/errors/Errors";

describe("ServerClient", () => {
    let client: postmark.ServerClient;
    const serverToken: any = process.env.SERVER_API_TOKEN;

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

        it("httpClient initialized", () => {
            expect(client.httpClient.client.defaults).not.to.eql(180000);
        });
    });

    it("clientVersion=", () => {
        const customClientVersion = "test";
        client.clientVersion = customClientVersion;
        expect(client.clientVersion).to.equal(customClientVersion);
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

        it("set clientOptions requestHost", () => {
            const host: string = "test.com";
            client.setClientOptions({requestHost: host});

            expect(client.getClientOptions()).to.eql({
                useHttps: true,
                requestHost: host,
                timeout: 180,
            });
        });
    });

    describe("valid requests", () => {
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        describe("httpRequest", () => {
            it("callback called once", async() => {
                const callback = sinon.spy();
                sandbox.stub(client.httpClient, "httpRequest").resolves("test");

                await client.getServer(callback);
                expect(callback.calledOnce).to.be.true
            });

            it("callback result",(done) => {
                const successMessage = "success!"
                sandbox.stub(client.httpClient, "httpRequest").resolves(successMessage);

                client.getServer((error: any, data) => {
                    expect(data).to.equal(successMessage);
                    expect(error).to.equal(null);
                    done();
                });
            });

            it("promise result", () => {
                const successMessage = "success!"
                sandbox.stub(client.httpClient, "httpRequest").resolves(successMessage);

                return client.getServer().then((result) => {
                    expect(result).to.eq(successMessage);
                }, (error) => {
                    throw Error(`Should not be here with error: ${error}`);
                });
            });
        });
    });

    describe("invalid requests", () => {
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("empty token", () => {
            expect(() => new postmark.ServerClient(""))
                .to.throw("A valid API token must be provided.");
        });

        describe("httpRequest", () => {
            it("promise error",  () => {
                const rejectError = new InternalServerError("response", 500, 500);
                sandbox.stub(client.httpClient, "httpRequest").rejects(rejectError);

                return client.getServer().then((result) => {
                    throw Error(`Should not be here with result: ${result}`);
                }, (error) => {
                    expect(error.name).to.eq(rejectError.name);
                });
            });

            it("callback error",(done) => {
                const errorType = "InternalServerError";
                const rejectError = new InternalServerError("response", 500, 500);

                client = new postmark.ServerClient("testToken");
                sandbox.stub(client.httpClient, "httpRequest").rejects(rejectError);

                client.getServer((error: any, data) => {
                    expect(data).to.equal(null);
                    expect(error.name).to.equal(errorType);
                    done();
                });
            });
        });
    });
});
