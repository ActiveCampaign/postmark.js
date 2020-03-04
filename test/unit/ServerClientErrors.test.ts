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
        describe("promise error", () => {
            it("instance", () => {
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects({ message: "Basic error", response: {data: "Basic error" }});

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.PostmarkError);
                });
            });

            it("message", () => {
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects({ message: "Basic error", response: {data: "Basic error" }});

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error.message).to.equal("Basic error");
                });
            });

            it("name", () => {
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects({ response: { data: 'response', status: 401} });

                return client.getBounces().then((result) => {
                    return result;
                }, (error) => {
                    expect(error.name).to.equal(invalidTokenError);
                });
            });
        });

        describe("callback error", () => {
            it("name", (done) => {
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects({ response: {data: "Basic error", status: 404}});

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

        describe("http status code errors", () => {
            let error: any = {
                response: {
                    data: "Basic error",
                    status: 505
                }
            };

            it("401", () => {
                error.response.status = 401;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.InvalidAPIKeyError);
                });
            });

            it("404", () => {
                error.response.status = 404;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.PostmarkError);
                });
            });

            it("422", () => {
                error.response.status = 422;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.ApiInputError);
                });
            });

            it("500", () => {
                error.response.status = 500;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.InternalServerError);
                });
            });

            it("503", () => {
                error.response.status = 503;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.ServiceUnavailablerError);
                });
            });

            it("505", () => {
                error.response.status = 505;
                sandbox.stub(BaseClient.prototype, <any> "httpRequest").rejects(error);

                const serverToken: string = testingKeys.get("SERVER_TOKEN");
                let client: postmark.ServerClient = new postmark.ServerClient(serverToken);

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.UnknownError);
                });
            });
        });
    });
});
