import * as postmark from "../../src/index";

import {expect} from "chai";
import "mocha";

import * as nconf from "nconf";
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
        const serverToken: string = testingKeys.get("SERVER_TOKEN");
        const client: postmark.ServerClient = new postmark.ServerClient(serverToken);

        describe("promise error", () => {
            it("instance", () => {
                sandbox.stub(client.httpClient, "request").rejects({ message: "Basic error", response: {data: "Basic error" }});

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.PostmarkError);
                });
            });

            it("message", () => {
                sandbox.stub(client.httpClient, "request").rejects({ message: "Basic error", response: {data: "Basic error" }});

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error.message).to.equal("Basic error");
                });
            });

            it("name", () => {
                sandbox.stub(client.httpClient, "request").rejects({ response: { data: 'response', status: 401} });

                return client.getBounces().then((result) => {
                    return result;
                }, (error) => {
                    expect(error.name).to.equal(invalidTokenError);
                });
            });
        });

        describe("callback error", () => {
            it("name", (done) => {
                sandbox.stub(client.httpClient, "request").rejects({ response: {data: "Basic error", status: 404}});

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
            const buildError = (statusNumber: number) => ({
                response: {
                    data: "Basic error",
                    status: statusNumber
                }
            });

            it("401", () => {
                sandbox.stub(client.httpClient, "request").rejects(buildError(401));

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.InvalidAPIKeyError);
                });
            });

            it("404", () => {
                sandbox.stub(client.httpClient, "request").rejects(buildError(404));

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.PostmarkError);
                });
            });

            it("422", () => {
                sandbox.stub(client.httpClient, "request").rejects(buildError(422));

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.ApiInputError);
                });
            });

            it("500", () => {
                sandbox.stub(client.httpClient, "request").rejects(buildError(500));

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.InternalServerError);
                });
            });

            it("503", () => {
                sandbox.stub(client.httpClient, "request").rejects(buildError(503));

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.ServiceUnavailablerError);
                });
            });

            it("505", () => {
                sandbox.stub(client.httpClient, "request").rejects(buildError(505));

                return client.getServer().then((result) => {
                    return result;
                }, (error) => {
                    expect(error).to.be.instanceOf(postmark.Errors.UnknownError);
                });
            });
        });
    });
});
