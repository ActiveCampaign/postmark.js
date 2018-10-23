import {ErrorHandler} from "../../src/client/ErrorHandler";
import {PostmarkError} from "../../src";

import { expect } from 'chai';
import 'mocha';

describe('ErrorHandler', () => {
    it('generateError', () => {
        const errorHandler: ErrorHandler = new ErrorHandler();

        let error: Error = new Error();
        error.name = "Test name";
        error.message = "Test message";

        let postmarkError: PostmarkError.StandardError = errorHandler.generateError(error);
        expect(postmarkError.message).to.equal(error.message);
        expect(postmarkError.name).to.equal('StandardError');
    });

    describe('statuses', () => {
        it('401', () => {
            const errorHandler: ErrorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                body: {
                    Message: "Test message",
                    ErrorCode: 401
                },
                statusCode: 401
            };

            let postmarkError: PostmarkError.InvalidAPIKeyError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(PostmarkError.InvalidAPIKeyError);
            expect(postmarkError.name).to.equal('InvalidAPIKeyError');
            expect(postmarkError.message).to.equal(error.body.Message);
        });

        it('500', () => {
            const errorHandler: ErrorHandler = new ErrorHandler();

            const error: any = {
                name: "Test name",
                body: {
                    Message: "Test message",
                    ErrorCode: 500
                },
                statusCode: 500
            };

            let postmarkError: PostmarkError.InternalServerError = errorHandler.generateError(error);
            expect(postmarkError).to.be.an.instanceof(PostmarkError.InternalServerError);
            expect(postmarkError.name).to.equal('InternalServerError')
            expect(postmarkError.message).to.equal(error.body.Message);
        });
    });
});