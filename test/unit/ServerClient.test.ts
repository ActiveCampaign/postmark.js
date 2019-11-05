import * as postmark from "../../src/index";

import {expect} from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({file: __dirname + "/../../testing_keys.json"});

const packageJson = require("../../package.json");
const clientVersion = packageJson.version;
import * as sinon from 'sinon';
import BaseClient from "../../src/client/BaseClient";

describe("ServerClient", () => {
    let client: postmark.ServerClient;
    const serverToken: string = testingKeys.get("SERVER_TOKEN");

    beforeEach(() => {
        client = new postmark.ServerClient(serverToken);
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

            client.clientOptions.requestHost = requestHost;
            client.clientOptions.useHttps = useHttps;
            client.clientOptions.timeout = timeout;

            expect(client.clientOptions).to.eql({
                useHttps,
                requestHost,
                timeout,
            });
        });

        it("new clientOptions as object", () => {
            const requestHost = "test";
            const useHttps = false;
            const timeout = 50;
            const clientOptions = new postmark.Models.ClientOptions.Configuration(useHttps, requestHost, timeout);
            client = new postmark.ServerClient(serverToken, clientOptions);

            expect(client.clientOptions).to.eql({
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

            expect(client.clientOptions).to.eql({
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

        it('processRequest - without body called', () => {
            sandbox.stub(BaseClient.prototype, <any> "processRequest").returns("called")
            expect(client.getServer()).to.eq("called")
        });

        it('processRequest - with body called', () => {
            sandbox.stub(BaseClient.prototype, <any> "processRequest").returns("called");
            expect(client.editServer({Name: 'Test'})).to.eq("called")
        });

        describe("callback", () => {
            it('process it when there are no errors', async() => {
                let callback = sinon.spy();
                sandbox.stub(BaseClient.prototype, <any> "processHttpRequest").returns(new Promise( function(resolve) { resolve("test"); }));
                await client.getServer(callback);

                expect(callback.calledOnce).to.be.true
            });

            it('process regular response based on request status', () => {
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").yields(undefined, {statusCode: 200, body: 'response'});

                return client.getServer( (error, result) => {
                    expect(result).to.eq('response');
                });
            });
            
            it('process error response based on request status',  () => {
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").yields(undefined, {statusCode: 201, body: 'response'});

                return client.getServer( (error: any, result) => {
                    expect(error.name).to.eq('UnknownError');
                }).catch( error => {});
            });
        });
    });

});
