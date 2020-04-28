import { Errors } from "../../src";
import { ErrorHandler } from "../../src/client/ErrorHandler";

import { expect } from "chai";
import "mocha";

describe("ErrorHandler", () => {
    it("buildGeneralError", () => {
        const errorHandler = new ErrorHandler();

        const error = new Error();
        error.name = "Test name";
        error.message = "Test message";

        const postmarkError = errorHandler.buildGeneralError("Test message");
        expect(postmarkError.message).to.equal(error.message);
        expect(postmarkError.name).to.equal("PostmarkError");
    });

    it("no response", () => {
        const errorHandler = new ErrorHandler();
        const error: any = { message: 'Hello Error' };

        const postmarkError = errorHandler.buildRequestError(error);
        expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
        expect(postmarkError.name).to.equal("PostmarkError");
        expect(postmarkError.message).to.equal(error.message);
    });

    it("no message", () => {
        const errorHandler = new ErrorHandler();
        const error: any = { stack: 'Hello stack' };

        const postmarkError = errorHandler.buildRequestError(error);
        expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
        expect(postmarkError.name).to.equal("PostmarkError");
        expect(postmarkError.message).to.equal(JSON.stringify(error));
    });

    describe("statuses", () => {
        it("401", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                response: {
                    data: {
                        Message: "Test message",
                        ErrorCode: 401,
                    },
                    status: 401,
                }
            };

            const postmarkError = errorHandler.buildRequestError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.InvalidAPIKeyError);
            expect(postmarkError.name).to.equal("InvalidAPIKeyError");
            expect(postmarkError.message).to.equal(error.response.data.Message);
        });

        it("422", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                response: {
                    data: {
                        Message: "Test message",
                        ErrorCode: 422,
                    },
                    status: 422,
                }
            };

            const postmarkError = errorHandler.buildRequestError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.ApiInputError);
            expect(postmarkError.name).to.equal("ApiInputError");
            expect(postmarkError.message).to.equal(error.response.data.Message);
        });

        it("500", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                response: {
                    data: {
                        Message: "Test message",
                        ErrorCode: 500,
                    },
                    status: 500,
                }
            };

            const postmarkError = errorHandler.buildRequestError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.InternalServerError);
            expect(postmarkError.name).to.equal("InternalServerError");
            expect(postmarkError.message).to.equal(error.response.data.Message);
        });

        it("unknown", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                response: {
                    data: {
                        Message: "Test message",
                        ErrorCode: 600,
                    },
                    status: 600,
                }
            };

            const postmarkError = errorHandler.buildRequestError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("UnknownError");
            expect(postmarkError.message).to.equal(error.response.data.Message);
        });

        it("no status", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                response: {
                    data: {
                        Message: "Test message"
                    }
                }
            };

            const postmarkError = errorHandler.buildRequestError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("UnknownError");
            expect(postmarkError.message).to.equal(error.response.data.Message);
        });

        it("postmark default error", () => {
            const errorHandler = new ErrorHandler();

            const postmarkError = errorHandler.buildGeneralError("Test message");
            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("PostmarkError");
            expect(postmarkError.message).to.equal("Test message");
        });
    });
});
