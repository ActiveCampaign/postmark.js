import {expect} from "chai";
import "mocha";
import * as sinon from "sinon";
import {FetchHttpClient} from "../../src/client/HttpClient";
import {ClientOptions} from "../../src/client/models";
import {Errors} from "../../src";

describe("FetchHttpClient", () => {
    let sandbox: sinon.SinonSandbox;
    const httpClient = new FetchHttpClient();

    // Minimal Fetch Response stand-in - only the members the client relies on.
    const buildResponse = (status: number, body?: any): any => ({
        status,
        text: async () => (body === undefined ? "" : JSON.stringify(body)),
    });

    const stubFetch = () => sandbox.stub(httpClient, "client");

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("successful requests", () => {
        it("returns parsed JSON body for 2xx responses", () => {
            stubFetch().resolves(buildResponse(200, {To: "receiver@example.com"}));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "/server", {}, null, {}).then((result: any) => {
                expect(result).to.eql({To: "receiver@example.com"});
            });
        });

        it("returns empty object when response body is empty", () => {
            stubFetch().resolves(buildResponse(200));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "/server", {}, null, {}).then((result: any) => {
                expect(result).to.eql({});
            });
        });
    });

    describe("request composition", () => {
        it("builds the URL from host, path and query parameters, skipping null/undefined", async () => {
            const stub = stubFetch().resolves(buildResponse(200, {}));

            await httpClient.httpRequest(ClientOptions.HttpMethod.GET, "/bounces",
                {count: 10, offset: 0, tag: undefined, name: null, subject: "hi there"}, null, {});

            expect(stub.firstCall.args[0]).to.equal("https://api.postmarkapp.com/bounces?count=10&offset=0&subject=hi+there");
        });

        it("prefixes the path with a slash when missing", async () => {
            const stub = stubFetch().resolves(buildResponse(200, {}));

            await httpClient.httpRequest(ClientOptions.HttpMethod.GET, "server", {}, null, {});

            expect(stub.firstCall.args[0]).to.equal("https://api.postmarkapp.com/server");
        });

        it("serializes the body, forwards the method and headers, and sets an abort signal", async () => {
            const stub = stubFetch().resolves(buildResponse(200, {}));
            const headers = {"X-Postmark-Server-Token": "abc", "Content-Type": "application/json"};

            await httpClient.httpRequest(ClientOptions.HttpMethod.POST, "/email", {}, {To: "a@b.com"}, headers);

            const init: any = stub.firstCall.args[1];
            expect(init.method).to.equal("POST");
            expect(init.body).to.equal(JSON.stringify({To: "a@b.com"}));
            expect(init.headers).to.eql(headers);
            expect(init.signal).to.be.instanceOf(AbortSignal);
        });

        it("does not send a body for bodyless requests", async () => {
            const stub = stubFetch().resolves(buildResponse(200, {}));

            await httpClient.httpRequest(ClientOptions.HttpMethod.GET, "/server", {}, null, {});

            const init: any = stub.firstCall.args[1];
            expect(init.body).to.equal(undefined);
        });

        it("expands array query params to repeated keys and serializes Dates as ISO strings", async () => {
            const stub = stubFetch().resolves(buildResponse(200, {}));
            const since = new Date("2026-01-02T03:04:05.000Z");

            await httpClient.httpRequest(ClientOptions.HttpMethod.GET, "/x",
                {tags: ["a", "b"], since} as any, null, {});

            expect(stub.firstCall.args[0])
                .to.equal("https://api.postmarkapp.com/x?tags=a&tags=b&since=2026-01-02T03%3A04%3A05.000Z");
        });
    });

    describe("custom fetch option", () => {
        it("uses a caller-supplied fetch implementation (e.g. for proxy support)", async () => {
            const customFetch = sinon.stub().resolves(buildResponse(200, {ok: true}));
            const clientWithFetch = new FetchHttpClient({fetch: customFetch} as any);

            const result: any = await clientWithFetch.httpRequest(ClientOptions.HttpMethod.GET, "/server", {}, null, {});

            expect(customFetch.calledOnce).to.be.true;
            expect(customFetch.firstCall.args[0]).to.equal("https://api.postmarkapp.com/server");
            expect(result).to.eql({ok: true});
        });
    });

    describe("network / timeout errors", () => {
        it("default error", () => {
            stubFetch().rejects(new Error("test"));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.PostmarkError);
                expect(error.message).to.equal("test");
                expect(error.code).to.equal(0);
                expect(error.statusCode).to.equal(0);
            });
        });

        it("error with no message in it", () => {
            const errorToThrow: any = { stack: 'Hello stack' };
            stubFetch().rejects(errorToThrow);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.an.instanceof(Errors.PostmarkError);
                expect(error.name).to.equal("PostmarkError");
                expect(error.message).to.equal(JSON.stringify(errorToThrow));
            });
        });
    });

    describe("http status code errors", () => {
        const stubStatus = (statusNumber: number, body: any = { Message: "Basic error", ErrorCode: 0 }) =>
            stubFetch().resolves(buildResponse(statusNumber, body));

        it("uses the response Message and ErrorCode for the built error", () => {
            stubStatus(500, { Message: "Server exploded", ErrorCode: 100 });

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error.message).to.equal("Server exploded");
                expect(error.code).to.equal(100);
                expect(error.statusCode).to.equal(500);
            });
        });

        it("falls back to a generic message when the body has none", () => {
            stubFetch().resolves(buildResponse(500));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InternalServerError);
                expect(error.message).to.equal("Request returned status code 500");
            });
        });

        it("401", () => {
            stubStatus(401);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InvalidAPIKeyError);
            });
        });

        it("404", () => {
            stubStatus(404);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.PostmarkError);
            });
        });

        it("422", () => {
            stubStatus(422);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.ApiInputError);
            });
        });

        it("422 - invalid email request", () => {
            stubStatus(422, { Message: "Basic error", ErrorCode: 300 });

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InvalidEmailRequestError);
            });
        });

        it("422 - inactive recipients", () => {
            stubStatus(422, { Message: "Basic error", ErrorCode: 406 });

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InactiveRecipientsError);
            });
        });

        it("429", () => {
            stubStatus(429);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.RateLimitExceededError);
            });
        });

        it("500", () => {
            stubStatus(500);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InternalServerError);
            });
        });

        it("503", () => {
            stubStatus(503);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.ServiceUnavailablerError);
            });
        });

        it("unknown status", () => {
            stubStatus(-1);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.UnknownError);
            });
        });
    });
});
