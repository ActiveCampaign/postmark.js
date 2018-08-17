import {PostmarkErrors} from "./models";
import {RequestError, StatusCodeError, TransformError} from "request-promise/errors";

/**
* This class handles all client request errors. Client response error is clasified so that proper response error is generated.
*
**/
export class ClientError {

    /**
     * Process callback function for HTTP request.
     *
     * @param error - error that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    public generate(error: Error): PostmarkErrors.PostmarkError {
        switch (error.name) {
            case "StatusCodeError":
                return this.buildStatusError(<StatusCodeError>error);
                break;
            case "RequestError":
                return this.buildRequestError(<RequestError>error);
                break;
            case "TransformError":
                return this.buildTransformError(<TransformError>error);
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
     * Build Postmark error.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildRequestError(error: RequestError):PostmarkErrors.PostmarkHttpError {
        const httpRequestDetails = this.formatHttpRequestDetails(error.error, error.options, error.response);
        return new PostmarkErrors.PostmarkHttpError(error.message, httpRequestDetails);
    }

    /**
     * Build Postmark error.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildTransformError(error: TransformError):PostmarkErrors.PostmarkHttpError {
        const httpRequestDetails = this.formatHttpRequestDetails(error.error, error.options, error.response);
        return new PostmarkErrors.PostmarkHttpError(error.message, httpRequestDetails);
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildStatusError(error: StatusCodeError) {
        const httpRequestDetails = this.formatHttpRequestDetails(error.error, error.options, error.response, error.statusCode);

        switch (error.statusCode) {
            case 401:
                return new PostmarkErrors.InvalidAPIKeyError(error.message, httpRequestDetails);
                break;

            case 422:
                return new PostmarkErrors.ApiInputError(error.message, httpRequestDetails);
                break;

            case 500:
                return new PostmarkErrors.InternalServerError(error.message, httpRequestDetails);
                break;

            case 503:
                return new PostmarkErrors.ServiceUnavailablerError(error.message, httpRequestDetails);
                break;

            default:
                return new PostmarkErrors.UnknownError(error.message, httpRequestDetails);
                break;
        }
    }

    /**
     * Format http request details to attach to a Postmark error.
     *
     * @param error - general httpRequest details
     * @param options - options for httpRequest
     * @param response - httpRequest response
     * @param statusCode - httpRequest status code
     *
     * @returns properly formatted httpRequest details
     */
    private formatHttpRequestDetails(error:any, options:any, response: any, statusCode?: number): PostmarkErrors.HttpRequestDetails {
        return { error: error, options: options, response: response, statusCode: statusCode }
    }
}
