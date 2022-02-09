import {DefaultResponse, HttpClientError, HttpClientErrorResponse} from "../models";
import * as Errors from "./Errors";

/**
 * Handles general errors and all client request errors.
 * Client response errors are classified so that proper response error is generated.
 */
export class ErrorHandler {

    /**
     * Process callback function for HTTP request.
     *
     * @param error - request error that needs to be transformed to proper Postmark error.
     *
     * @return {PostmarkError} - formatted Postmark error
     */
    public buildRequestError(error: HttpClientError): Errors.PostmarkError {
        const response: HttpClientErrorResponse | undefined = error.response;

        if (response !== undefined) {
            return this.buildErrorForResponse(response, error.message);
        } else if (error.message !== undefined) {
            return this.buildGeneralError(error.message);
        } else {
            return this.buildGeneralError(JSON.stringify(error, Object.getOwnPropertyNames(error)));
        }
    }

    /**
     * Build general Postmark error.
     *
     * @param errorMessage - error message that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    public buildGeneralError(errorMessage: string): Errors.PostmarkError {
        return new Errors.PostmarkError(errorMessage);
    }

    /**
     * Build Postmark error based on response from http client.
     *
     * @param {AxiosResponse} response - request response used to transform to Postmark error.
     * @return {PostmarkError} - formatted Postmark error
     */
    private buildErrorForResponse(response: HttpClientErrorResponse, errorMessage: string): Errors.PostmarkError {
        const data: DefaultResponse = response.data;
        const status = this.retrieveDefaultOrValue<number>(0, response.status);
        const errorCode = this.retrieveDefaultOrValue<number>(0, data.ErrorCode);
        const message = this.retrieveDefaultOrValue<string>(errorMessage, data.Message);

        return this.buildRequestErrorByStatus(message, errorCode, status);
    }

    private retrieveDefaultOrValue<T>(defaultValue: T, data: T): T {
        return (data === undefined) ? defaultValue : data;
    }

    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    private buildRequestErrorByStatus(errorMessage: string, errorCode: number, errorStatusCode: number): Errors.HttpError {
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
