import {expect} from "chai";
import "mocha";
import * as sinon from "sinon";
import {FetchHttpClient} from "../../src/client/HttpClient";
import {ClientOptions} from "../../src/client/models";
import {Errors} from "../../src";

describe("FetchHttpClient", () => {
    let sandbox: sinon.SinonSandbox;
    const httpClient = new FetchHttpClient();

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    function stubFetchReject(error: any) {
        sandbox.stub(global, "fetch").rejects(error);
    }

    function stubFetchResponse(status: number, body: any, ok?: boolean) {
        const response = {
            ok: ok !== undefined ? ok : (status >= 200 && status < 300),
            status,
            statusText: "Error",
            text: () => Promise.resolve(JSON.stringify(body)),
        };
        sandbox.stub(global, "fetch").resolves(response as any);
    }

    it("default error", () => {
        stubFetchReject(new Error("test"));

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
        stubFetchReject(errorToThrow);

        return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
            throw Error(`Should not be here with result: ${result}`);
        }, (error) => {
            expect(error).to.be.an.instanceof(Errors.PostmarkError);
            expect(error.name).to.equal("PostmarkError");
            expect(error.message).to.equal(JSON.stringify(errorToThrow));
        });
    });

    describe("http status code errors", () => {
        const buildErrorResponse = (statusNumber: number, errorCode?: number) => ({
            Message: "Basic error", ErrorCode: errorCode !== undefined ? errorCode : 0
        });

        it("401", () => {
            stubFetchResponse(401, buildErrorResponse(401));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InvalidAPIKeyError);
            });
        });

        it("404", () => {
            stubFetchResponse(404, buildErrorResponse(404));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.PostmarkError);
            });
        });

        it("422", () => {
            stubFetchResponse(422, buildErrorResponse(422));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.ApiInputError);
            });
        });

        it("422 - inactive recipients", () => {
            stubFetchResponse(422, buildErrorResponse(422, 300));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InvalidEmailRequestError);
            });
        });

        it("422 - invalid email", () => {
            stubFetchResponse(422, buildErrorResponse(422, 406));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InactiveRecipientsError);
            });
        });

        it("429", () => {
            stubFetchResponse(429, buildErrorResponse(429));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.RateLimitExceededError);
            });
        });

        it("500", () => {
            stubFetchResponse(500, buildErrorResponse(500));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InternalServerError);
            });
        });

        it("503", () => {
            stubFetchResponse(500, buildErrorResponse(500));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InternalServerError);
            });
        });

        it("unknown status", () => {
            stubFetchResponse(-1, buildErrorResponse(-1), false);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.UnknownError);
            });
        });
    });
});
