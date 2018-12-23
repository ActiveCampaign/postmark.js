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
        if (error.body !== undefined && error.statusCode !== undefined) {
            return this.buildStatusError(error);
        } else {
            return this.buildError(error);
        }
    }

    /**
     * Build general Postmark error.
     *
     * @param error - error that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildError(error: Error): Errors.PostmarkError {
        return new Errors.PostmarkError(error.message);
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildStatusError(error: any): Errors.HttpError {
        switch (error.statusCode) {
            case 401:
                return new Errors.InvalidAPIKeyError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 422:
                return new Errors.ApiInputError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 500:
                return new Errors.InternalServerError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 503:
                return new Errors.ServiceUnavailablerError(error.body.Message, error.body.ErrorCode, error.statusCode);

            default:
                return new Errors.UnknownError(error.body.Message, error.body.ErrorCode, error.statusCode);
        }
    }
}
