import * as postmark from "../../src/index";

import {expect} from "chai";
import "mocha";

import * as nconf from "nconf";
import BaseClient from "../../src/client/BaseClient";
import * as sinon from 'sinon';

const testingKeys = nconf.env().file({file: __dirname + "/../../testing_keys.json"});

describe("ServerClient - Errors", () => {
    let client: postmark.ServerClient;
    const serverToken: string = testingKeys.get("SERVER_TOKEN");

    beforeEach(() => {
        client = new postmark.ServerClient(serverToken);
    });

    const invalidTokenError = "InvalidAPIKeyError";

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("handling errors", () => {
        it("throw basic error - promise", () => {
            sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(new Error("Basic error"));

            const serverToken: string = testingKeys.get("SERVER_TOKEN");
            let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

            return client.getServer().then((result) => {
                return result;
            }, (error) => {
                expect(error).to.be.instanceOf(postmark.Errors.PostmarkError);
                expect(error.message).to.equal("Basic error");
            });
        });

        it("throw api key error - promise", () => {
            let error: any = new Error("Basic error");
            error.statusCode = 401;
            sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(error);

            const serverToken: string = testingKeys.get("SERVER_TOKEN");
            let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

            return client.getServer().then((result) => {
                return result;
            }, (error) => {
                expect(error).to.be.instanceOf(postmark.Errors.InvalidAPIKeyError);
            });
        });

        describe("http status code errors", () => {
            it("404", () => {
                let error: any = new Error("Basic error");
                error.statusCode = 404;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.PostmarkError);
                });
            });

            it("422", () => {
                let error: any = new Error("Basic error");
                error.statusCode = 422;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(error)

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.ApiInputError);
                });
            });

            it("500", () => {
                let error: any = new Error("Basic error");
                error.statusCode = 500;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.InternalServerError);
                });
            });

            it("503", () => {
                let error: any = new Error("Basic error");
                error.statusCode = 503;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.ServiceUnavailablerError);
                });
            });

            it("505", () => {
                let error: any = new Error("Basic error");
                error.statusCode = 505;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.UnknownError);
                });
            });
        });

        it("throw basic error - callback", (done) => {
            sandbox.stub(BaseClient.prototype, <any> "httpRequest").throws(new Error("Basic error"));

            const serverToken: string = testingKeys.get("SERVER_TOKEN");
            let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

            client.getServer((error: any, data) => {
                expect(data).to.equal(null);
                expect(error.name).to.equal('PostmarkError');
                done();
            });
        });
    });

    it("empty token", () => {
        expect(() => new postmark.ServerClient(""))
            .to.throw("A valid API token must be provided.");
    });

    it("promise error", () => {
        sandbox.stub(BaseClient.prototype, <any> "httpRequest").yields(undefined, {statusCode: 401, body: 'response'});

        return client.getBounces().then((result) => {
            return result;
        }, (error) => {
            expect(error.name).to.equal(invalidTokenError);
        });
    });

    it("callback error", (done) => {
        client = new postmark.ServerClient("testToken");
        sandbox.stub(BaseClient.prototype, <any> "httpRequest").yields(undefined, {statusCode: 401, body: 'response'});

        client.getBounces(undefined, (error: any, data) => {
            expect(data).to.equal(null);
            expect(error.name).to.equal(invalidTokenError);
            done();
        });
    });
});
