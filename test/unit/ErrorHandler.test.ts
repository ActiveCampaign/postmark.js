import {ErrorHandler} from "../../src/client/ErrorHandler";
import {PostmarkErrors} from "../../src/client/models/client/PostmarkError";

import { expect } from 'chai';
import 'mocha';

describe('ErrorHandler', () => {
    it('generateError', () => {
        const errorHandler: ErrorHandler = new ErrorHandler();

        let error: Error = new Error();
        error.name = "Test name";
        error.message = "Test message";

        let postmarkError: PostmarkErrors.PostmarkError = errorHandler.generateError(error);
        expect(postmarkError.message).to.equal(error.message);
        expect(postmarkError.name).to.equal('PostmarkError');
    });

    it('generateError - with status', () => {
        const errorHandler: ErrorHandler = new ErrorHandler();

        const error: any = {
            name: "Test name",
            body: {
                Message: "Test message",
                ErrorCode: 500
            },
            statusCode: 500
        };

        let postmarkError: PostmarkErrors.PostmarkError = errorHandler.generateError(error);
        expect(postmarkError.name).to.equal('InternalServerError');
        expect(postmarkError.message).to.equal(error.body.Message);
    });
});