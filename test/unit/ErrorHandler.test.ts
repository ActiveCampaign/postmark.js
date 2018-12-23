import { Errors } from "../../src";
import { ErrorHandler } from "../../src/client/ErrorHandler";

import { expect } from "chai";
import "mocha";

describe("ErrorHandler", () => {
    it("generateError", () => {
        const errorHandler = new ErrorHandler();

        const error = new Error();
        error.name = "Test name";
        error.message = "Test message";

        const postmarkError = errorHandler.generateError(error);
        expect(postmarkError.message).to.equal(error.message);
        expect(postmarkError.name).to.equal("PostmarkError");
    });

    describe("statuses", () => {
        it("401", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                body: {
                    Message: "Test message",
                    ErrorCode: 401,
                },
                statusCode: 401,
            };

            const postmarkError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.InvalidAPIKeyError);
            expect(postmarkError.name).to.equal("InvalidAPIKeyError");
            expect(postmarkError.message).to.equal(error.body.Message);
        });

        it("422", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                body: {
                    Message: "Test message",
                    ErrorCode: 422,
                },
                statusCode: 422,
            };

            const postmarkError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.ApiInputError);
            expect(postmarkError.name).to.equal("ApiInputError");
            expect(postmarkError.message).to.equal(error.body.Message);
        });

        it("500", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                body: {
                    Message: "Test message",
                    ErrorCode: 500,
                },
                statusCode: 500,
            };

            const postmarkError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.InternalServerError);
            expect(postmarkError.name).to.equal("InternalServerError");
            expect(postmarkError.message).to.equal(error.body.Message);
        });

        it("unknown", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                message: "test message",
                statusCode: 600,
            };

            const postmarkError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("PostmarkError");
            expect(postmarkError.message).to.equal(error.message);
        });
    });
});
