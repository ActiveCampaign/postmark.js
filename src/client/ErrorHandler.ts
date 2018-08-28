import {PostmarkErrors} from "./models";
import * as request from "request";

/**
 * This class handles all client request errors. Client response error is clasified so that proper response error is generated.
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
    public generateError(error: any): PostmarkErrors.PostmarkError {
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
    private buildError(error: Error): PostmarkErrors.PostmarkError {
        return new PostmarkErrors.PostmarkError(error.message);
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildStatusError(error: any) {
        switch (error.statusCode) {
            case 401:
                return new PostmarkErrors.InvalidAPIKeyError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 422:
                return new PostmarkErrors.ApiInputError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 500:
                return new PostmarkErrors.InternalServerError(error.body.Message, error.body.ErrorCode, error.statusCode);

            case 503:
                return new PostmarkErrors.ServiceUnavailablerError(error.body.Message, error.body.ErrorCode, error.statusCode);

            default:
                return new PostmarkErrors.UnknownError(error.body.Message, error.body.ErrorCode, error.statusCode);
        }
    }
}
