import {PostmarkErrors} from "./models";
import * as requestPromiseErrors from "request-promise/errors";

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
    public generateError(error: Error): PostmarkErrors.PostmarkError {
        switch (error.name) {
            case "StatusCodeError":
                return this.buildStatusError(<requestPromiseErrors.StatusCodeError>error);
                break;
            case "RequestError":
                return this.buildRequestError(<requestPromiseErrors.RequestError>error);
                break;
            case "TransformError":
                return this.buildTransformError(<requestPromiseErrors.TransformError>error);
                break;
            default:
                return this.buildError(error);
                break;
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
     * Build Postmark error. Error code from Postmark and HTTP request error can not be identified for this error, so they will be default.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildRequestError(error: requestPromiseErrors.RequestError):PostmarkErrors.PostmarkHttpError {
        return new PostmarkErrors.PostmarkHttpError(error.message, -1, 500)
    }

    /**
     * Build Postmark error. Error code from Postmark and HTTP request error can not be identified for this error, so they will be default.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildTransformError(error: requestPromiseErrors.TransformError):PostmarkErrors.PostmarkHttpError {
        return new PostmarkErrors.PostmarkHttpError(error.message, -1, 500);
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildStatusError(error: requestPromiseErrors.StatusCodeError) {
        switch (error.statusCode) {
            case 401:
                return new PostmarkErrors.InvalidAPIKeyError(error.error.Message, error.error.ErrorCode, error.statusCode);
                break;

            case 422:
                return new PostmarkErrors.ApiInputError(error.error.Message, error.error.ErrorCode, error.statusCode);
                break;

            case 500:
                return new PostmarkErrors.InternalServerError(error.error.Message, error.error.ErrorCode, error.statusCode);
                break;

            case 503:
                return new PostmarkErrors.ServiceUnavailablerError(error.error.Message, error.error.ErrorCode, error.statusCode);
                break;

            default:
                return new PostmarkErrors.UnknownError(error.error.Message, error.error.ErrorCode, error.statusCode);
                break;
        }
    }
}
