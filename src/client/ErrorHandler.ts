import {PostmarkError} from "./models";

/**
 * This class handles all client request errors. Client response error is classified so that proper response error is generated.
 *
 **/
export class ErrorHandler {

    /**
     * Process callback function for HTTP request.
     *
     * @param error - error that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    public generateError(error: any): PostmarkError.StandardError  {
        if (error.statusCode !== undefined) {
            return this.buildStatusError(error);
        }
        else {
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
    private buildError(error: Error): PostmarkError.StandardError {
        return new PostmarkError.StandardError(error.message);
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildStatusError(error: any):PostmarkError.HttpError {
        switch (error.statusCode) {
            case 401:
                return new PostmarkError.InvalidAPIKeyError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 422:
                return new PostmarkError.ApiInputError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 500:
                return new PostmarkError.InternalServerError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 503:
                return new PostmarkError.ServiceUnavailablerError(error.body.Message, error.body.ErrorCode, error.statusCode);

            default:
                return new PostmarkError.UnknownError(error.body.Message, error.body.ErrorCode, error.statusCode);
        }
    }
}
