import * as Errors from "./models/client/Errors";
import {AxiosError, AxiosResponse} from "axios";
import {DefaultResponse} from "./models";

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
    public buildRequestError(error: AxiosError): Errors.PostmarkError {
        const response: AxiosResponse | undefined = error.response;
        if (response !== undefined) {
            return this.buildErrorForResponse(response);
        }
        else {
            return this.buildGeneralError(error.toJSON.toString());
        }
    }

    private buildErrorForResponse(response: AxiosResponse): Errors.PostmarkError {
        const data: DefaultResponse = response.data;
        const errorCode = (data.ErrorCode === undefined) ? 0 : data.ErrorCode;
        const message = (data.Message === undefined) ? response.data.toString() : data.Message;
        const status = (response.status === undefined) ? -1 : response.status;

        return this.buildStatusError(message, errorCode, status);
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
