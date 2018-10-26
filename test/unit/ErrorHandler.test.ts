import { ErrorHandler } from "../../src/client/ErrorHandler";
import { Errors } from "../../src";

import { expect } from 'chai';
import 'mocha';

describe('ErrorHandler', () => {
    it('generateError', () => {
        const errorHandler = new ErrorHandler();

        let error = new Error();
        error.name = "Test name";
        error.message = "Test message";

        let postmarkError = errorHandler.generateError(error);
        expect(postmarkError.message).to.equal(error.message);
        expect(postmarkError.name).to.equal('PostmarkError');
    });

    describe('statuses', () => {
        it('401', () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                body: {
                    Message: "Test message",
                    ErrorCode: 401
                },
                statusCode: 401
            };

            let postmarkError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.InvalidAPIKeyError);
            expect(postmarkError.name).to.equal('InvalidAPIKeyError');
            expect(postmarkError.message).to.equal(error.body.Message);
        });

        it('500', () => {
            const errorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                body: {
                    Message: "Test message",
                    ErrorCode: 500
                },
                statusCode: 500
            };

            let postmarkError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.InternalServerError);
            expect(postmarkError.name).to.equal('InternalServerError')
            expect(postmarkError.message).to.equal(error.body.Message);
        });
    });
});