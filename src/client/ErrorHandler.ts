import * as Errors from "./models/client/Errors";

/**
 * This class handles all client request errors. Client response error is classified so that proper response error is generated.
 *
 */
export class ErrorHandler {

    /**
     * Process callback function for HTTP request.
     *
     * @param error - error that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    public generateError(error: any): Errors.PostmarkError {
        if (error.body !== undefined && error.body.Message !== undefined && error.statusCode !== undefined) {
            return this.buildStatusError(error.body.Message, error.body.ErrorCode, error.statusCode);
        } else if (error.statusCode !== undefined) {
            const errorMessage: string = (error.message === undefined) ? error.statusMessage : error.message;
            return this.buildStatusError(errorMessage, 0, error.statusCode);
        } else {
            return this.buildGeneralError(error.message);
        }
    }

    /**
     * Build general Postmark error.
     *
     * @param errorMessage - error message that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildGeneralError(errorMessage: string): Errors.PostmarkError {
        return new Errors.PostmarkError(errorMessage);
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildStatusError(errorMessage: string, errorCode: number, errorStatusCode: number): Errors.HttpError {
        switch (errorStatusCode) {
            case 401:
                return new Errors.InvalidAPIKeyError(errorMessage, errorCode, errorStatusCode);

            case 404:
                return new Errors.PostmarkError(errorMessage, errorCode, errorStatusCode);

            case 422:
                return new Errors.ApiInputError(errorMessage, errorCode, errorStatusCode);

            case 500:
                return new Errors.InternalServerError(errorMessage, errorCode, errorStatusCode);

            case 503:
                return new Errors.ServiceUnavailablerError(errorMessage, errorCode, errorStatusCode);

            default:
                return new Errors.UnknownError(errorMessage, errorCode, errorStatusCode);
        }
    }
}
