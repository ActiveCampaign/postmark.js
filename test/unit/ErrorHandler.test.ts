import { Errors } from "../../src";
import { ErrorHandler } from "../../src/client/errors/ErrorHandler";

import { expect } from "chai";
import "mocha";

describe("ErrorHandler", () => {
    it("buildError", () => {
        const errorHandler = new ErrorHandler();
        const error = new Error();
        const postmarkError = errorHandler.buildError("Test message");
        error.name = "Test name";
        error.message = "Test message";

        expect(postmarkError.message).to.equal(error.message);
        expect(postmarkError.name).to.equal("PostmarkError");
    });

    it("no response", () => {
        const errorHandler = new ErrorHandler();
        const error: any = { message: 'Hello Error' };
        const postmarkError = errorHandler.buildError(error.message);

        expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
        expect(postmarkError.name).to.equal("PostmarkError");
        expect(postmarkError.message).to.equal(error.message);
        expect(postmarkError.code).to.equal(0);
        expect(postmarkError.statusCode).to.equal(0)
    });

    describe("statuses", () => {
        it("401", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message", 401, 401);

            expect(postmarkError).to.be.an.instanceof(Errors.InvalidAPIKeyError);
            expect(postmarkError.name).to.equal("InvalidAPIKeyError");
            expect(postmarkError.message).to.equal("Test message");
        });

        it("422", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message", 423, 422);

            expect(postmarkError).to.be.an.instanceof(Errors.ApiInputError);
            expect(postmarkError.name).to.equal("ApiInputError");
            expect(postmarkError.message).to.equal("Test message");
            expect(postmarkError.code).to.equal(423);
            expect(postmarkError.statusCode).to.equal(422);
        });

        it("429", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message", 429, 429);

            expect(postmarkError).to.be.an.instanceof(Errors.RateLimitExceededError);
            expect(postmarkError.name).to.equal("RateLimitExceededError");
            expect(postmarkError.message).to.equal("Test message");
        });

        it("500", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message", 500, 500);

            expect(postmarkError).to.be.an.instanceof(Errors.InternalServerError);
            expect(postmarkError.name).to.equal("InternalServerError");
            expect(postmarkError.message).to.equal("Test message");
        });

        it("unknown", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message", 600, 600);

            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("UnknownError");
            expect(postmarkError.message).to.equal("Test message");
        });

        it("no http status", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message");

            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("PostmarkError");
            expect(postmarkError.message).to.equal("Test message");
        });

        it("unknown http status", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message", 500, 15);

            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("UnknownError");
            expect(postmarkError.message).to.equal("Test message");
        });

        it("postmark default error", () => {
            const errorHandler = new ErrorHandler();
            const postmarkError = errorHandler.buildError("Test message");

            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("PostmarkError");
            expect(postmarkError.message).to.equal("Test message");
        });
    });

    describe("api input error classifications", () => {
        it("all inactive recipients", () => {
            const errorHandler = new ErrorHandler();

            const error: any = {

                message: "You tried to send to recipient(s) that have been marked as inactive. " +
                    "Found inactive addresses: bounce@example.com, bounce2@example.com. " +
                    "Inactive recipients are ones that have generated a hard bounce, a spam complaint, or a manual suppression."
                , errorCode: 406, status: 422
            };

            const postmarkError:any = errorHandler.buildError(error.message, error.errorCode, error.status);

            expect(postmarkError).to.be.an.instanceof(Errors.InactiveRecipientsError);
            expect(postmarkError.name).to.equal("InactiveRecipientsError");
            expect(postmarkError.recipients).to.eql([ 'bounce@example.com', 'bounce2@example.com' ])
        });

        it("email error", () => {
            const errorHandler = new ErrorHandler();
            const error: any = { message: "Error message", errorCode: 300, status: 422 };
            const postmarkError:any = errorHandler.buildError(error.message, error.errorCode, error.status);

            expect(postmarkError).to.be.an.instanceof(Errors.InvalidEmailRequestError);
            expect(postmarkError.name).to.equal("InvalidEmailRequestError");
        });

        it("parse some inactive recipients - single", () => {
            const message = "Message OK, but will not deliver to these inactive addresses: bounce@example.com"

            const inactiveRecipients = Errors.InactiveRecipientsError.parseInactiveRecipients(message)
            expect(inactiveRecipients).to.eql([ 'bounce@example.com' ])

        });

        it("parse some inactive recipients - multiple", () => {
            const message = "Message OK, but will not deliver to these inactive addresses: bounce@example.com, bounce2@example.com"

            const inactiveRecipients = Errors.InactiveRecipientsError.parseInactiveRecipients(message)
            expect(inactiveRecipients).to.eql([ 'bounce@example.com', 'bounce2@example.com' ])

        });

        it("parse all inactive recipients - multiple", () => {
            const message = "You tried to send to recipient(s) that have been marked as inactive. Found inactive addresses: " +
            "bounce@example.com, bounce2@example.com. " +
            "Inactive recipients are ones that have generated a hard bounce, a spam complaint, or a manual suppression."

            const inactiveRecipients = Errors.InactiveRecipientsError.parseInactiveRecipients(message);
            expect(inactiveRecipients).to.eql([ 'bounce@example.com', 'bounce2@example.com' ])
        });

        it("parse all inactive recipients - multiple - no whitespace between addresses", () => {
            const message = "You tried to send to recipient(s) that have been marked as inactive. Found inactive addresses: " +
                "bounce@example.com,bounce2@example.com " +
                "Inactive recipients are ones that have generated a hard bounce, a spam complaint, or a manual suppression."

            const inactiveRecipients = Errors.InactiveRecipientsError.parseInactiveRecipients(message);
            expect(inactiveRecipients).to.eql([ 'bounce@example.com', 'bounce2@example.com' ])
        });
    });
});
