"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("./models");
/**
* This class handles all client request errors. Client response error is clasified so that proper response error is generated.
*
**/
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    /**
     * Process callback function for HTTP request.
     *
     * @param error - error that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    ErrorHandler.prototype.generateError = function (error) {
        switch (error.name) {
            case "StatusCodeError":
                return this.buildStatusError(error);
            case "RequestError":
                return this.buildRequestError(error);
            case "TransformError":
                return this.buildTransformError(error);
            default:
                return this.buildError(error);
        }
    };
    /**
     * Build general Postmark error.
     *
     * @param error - error that needs to be identified and transformed to proper Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    ErrorHandler.prototype.buildError = function (error) {
        return new models_1.PostmarkErrors.PostmarkError(error.message);
    };
    /**
     * Build Postmark error. Error code from Postmark and HTTP request error can not be identified for this error, so they will be default.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    ErrorHandler.prototype.buildRequestError = function (error) {
        return new models_1.PostmarkErrors.PostmarkHttpError(error.message, -1, 500);
    };
    /**
     * Build Postmark error. Error code from Postmark and HTTP request error can not be identified for this error, so they will be default.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    ErrorHandler.prototype.buildTransformError = function (error) {
        return new models_1.PostmarkErrors.PostmarkHttpError(error.message, -1, 500);
    };
    /**
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    ErrorHandler.prototype.buildStatusError = function (error) {
        switch (error.statusCode) {
            case 401:
                return new models_1.PostmarkErrors.InvalidAPIKeyError(error.error.Message, error.error.ErrorCode, error.statusCode);
            case 422:
                return new models_1.PostmarkErrors.ApiInputError(error.error.Message, error.error.ErrorCode, error.statusCode);
            case 500:
                return new models_1.PostmarkErrors.InternalServerError(error.error.Message, error.error.ErrorCode, error.statusCode);
            case 503:
                return new models_1.PostmarkErrors.ServiceUnavailablerError(error.error.Message, error.error.ErrorCode, error.statusCode);
            default:
                return new models_1.PostmarkErrors.UnknownError(error.error.Message, error.error.ErrorCode, error.statusCode);
        }
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map