import {expect} from "chai";
import "mocha";
import * as sinon from "sinon";
import {AxiosHttpClient} from "../../src/client/HttpClient";
import {ClientOptions} from "../../src/client/models";
import {Errors} from "../../src";

describe("AxiosHttpClient", () => {
    let sandbox: sinon.SinonSandbox;
    const httpClient = new AxiosHttpClient();

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("default error", () => {
        sandbox.stub(httpClient.client, "request").rejects(new Error("test"));

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
        sandbox.stub(httpClient.client, "request").rejects(errorToThrow);

        return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
            throw Error(`Should not be here with result: ${result}`);
        }, (error) => {
            expect(error).to.be.an.instanceof(Errors.PostmarkError);
            expect(error.name).to.equal("PostmarkError");
            expect(error.message).to.equal(JSON.stringify(errorToThrow));
        });
    });

    describe("http status code errors", () => {
        const buildAxiosFormatError = (statusNumber: number) => ({
            response: { data: { Message: "Basic error", ErrorCode: 0 }, status: statusNumber }
        });

        it("401", () => {
            sandbox.stub(httpClient.client, "request").rejects(buildAxiosFormatError(401));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InvalidAPIKeyError);
            });
        });

        it("404", () => {
            sandbox.stub(httpClient.client, "request").rejects(buildAxiosFormatError(404));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.PostmarkError);
            });
        });

        it("422", () => {
            sandbox.stub(httpClient.client, "request").rejects(buildAxiosFormatError(422));

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.ApiInputError);
            });
        });

        it("422 - inactive recipients", () => {
            const errorToThrow = buildAxiosFormatError(422)
            errorToThrow.response.data.ErrorCode=300
            sandbox.stub(httpClient.client, "request").rejects(errorToThrow);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InvalidEmailRequestError);
            });
        });

        it("422 - invalid email", () => {
            const errorToThrow = buildAxiosFormatError(422)
            errorToThrow.response.data.ErrorCode=406
            sandbox.stub(httpClient.client, "request").rejects(errorToThrow);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InactiveRecipientsError);
            });
        });

        it("429", () => {
            const errorToThrow = buildAxiosFormatError(429)
            sandbox.stub(httpClient.client, "request").rejects(errorToThrow);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.RateLimitExceededError);
            });
        });

        it("500", () => {
            const errorToThrow = buildAxiosFormatError(500)
            sandbox.stub(httpClient.client, "request").rejects(errorToThrow);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InternalServerError);
            });
        });

        it("503", () => {
            const errorToThrow = buildAxiosFormatError(500)
            sandbox.stub(httpClient.client, "request").rejects(errorToThrow);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.InternalServerError);
            });
        });

        it("unknown status", () => {
            const errorToThrow = buildAxiosFormatError(-1)
            sandbox.stub(httpClient.client, "request").rejects(errorToThrow);

            return httpClient.httpRequest(ClientOptions.HttpMethod.GET, "", {}, null, {}).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error).to.be.instanceOf(Errors.UnknownError);
            });
        });
    });
});
