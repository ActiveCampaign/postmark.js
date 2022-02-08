import { Errors } from "../../src";
import { ErrorHandler } from "../../src/client/errors/ErrorHandler";

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

        it("429", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                response: {
                    data: {
                        Message: "Test message",
                        ErrorCode: 429,
                    },
                    status: 429,
                }
            };

            const postmarkError = errorHandler.buildRequestError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.RateLimitExceededError);
            expect(postmarkError.name).to.equal("RateLimitExceededError");
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

    describe("api input error classifications", () => {
        it("all inactive recipients", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                response: {
                    data: {
                        Message: "InactiveRecipientsError: You tried to send to recipients " +
                            "that have all been marked as inactive.\n" +
                            "Found inactive addresses: nothing2@example.com, nothing@example.com.\n" +
                            "Inactive recipients are ones that have generated a hard bounce, " +
                            "a spam complaint, or a manual suppression.\n",
                        ErrorCode: 406,
                    },
                    status: 422,
                }
            };

            const postmarkError: any = errorHandler.buildRequestError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.InactiveRecipientsError);
            expect(postmarkError.name).to.equal("InactiveRecipientsError");
            expect(postmarkError.recipients).to.eql([ 'nothing2@example.com', 'nothing@example.com' ])
        });

        it("parse some inactive recipients", () => {
            const errorHandler = new ErrorHandler();

            const message = "Message OK, but will not deliver to these inactive addresses: " +
                "nothing2@example.com, nothing@example.com"

            const inactiveRecipients = Errors.InactiveRecipientsError.parseInactiveRecipients(message)
            expect(inactiveRecipients).to.eql([ 'nothing2@example.com', 'nothing@example.com' ])

        });

        it("parse some inactive recipients - different error message", () => {
            const errorHandler = new ErrorHandler();

            const message = "Message OK, but will not deliver to these inactive addresses: " +
                "nothing2@example.com, nothing@example.com. Inactive addresses can be activated."

            const inactiveRecipients = Errors.InactiveRecipientsError.parseInactiveRecipients(message)
            expect(inactiveRecipients).to.eql([ 'nothing2@example.com', 'nothing@example.com' ])

        });
    });
});
