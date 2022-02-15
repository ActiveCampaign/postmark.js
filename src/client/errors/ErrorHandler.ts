import {DefaultResponse} from "../models";
import * as Errors from "./Errors";

/**
 * Handles general errors and all client request errors.
 * Client response errors are classified so that proper response error is generated.
 */
export class ErrorHandler {

    /**
     * Build general Postmark error.
     *
     * @param errorMessage - error message that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    public buildError(errorMessage: string, code: number = 0, statusCode: number = 0): Errors.PostmarkError|Errors.HttpError {
        if (statusCode === 0 && code === 0) {
            return new Errors.PostmarkError(errorMessage);
        }
        else {
            return this.buildErrorByHttpStatusCode(errorMessage, code, statusCode);
        }
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildErrorByHttpStatusCode(errorMessage: string, errorCode: number, errorStatusCode: number): Errors.HttpError {
        switch (errorStatusCode) {
            case 401:
                return new Errors.InvalidAPIKeyError(errorMessage, errorCode, errorStatusCode);

            case 404:
                return new Errors.PostmarkError(errorMessage, errorCode, errorStatusCode);

            case 422:
                return Errors.ApiInputError.buildSpecificError(errorMessage, errorCode, errorStatusCode);

            case 429:
                return new Errors.RateLimitExceededError(errorMessage, errorCode, errorStatusCode);

            case 500:
                return new Errors.InternalServerError(errorMessage, errorCode, errorStatusCode);

            case 503:
                return new Errors.ServiceUnavailablerError(errorMessage, errorCode, errorStatusCode);

            default:
                return new Errors.UnknownError(errorMessage, errorCode, errorStatusCode);
        }
    }
}
