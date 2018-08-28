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
        if (error.statusCode !== undefined) {
            return this.buildStatusError(error);
        }
        else {
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
     * Build Postmark error based on HTTP request status.
     *
     * @param error - http request library error, that will be transformed to Postmark error.
     *
     * @returns properly formatted Postmark error.
     */
    ErrorHandler.prototype.buildStatusError = function (error) {
        switch (error.statusCode) {
            case 401:
                return new models_1.PostmarkErrors.InvalidAPIKeyError(error.body.Message, error.body.ErrorCode, error.statusCode);
            case 422:
                return new models_1.PostmarkErrors.ApiInputError(error.body.Message, error.body.ErrorCode, error.statusCode);
            case 500:
                return new models_1.PostmarkErrors.InternalServerError(error.body.Message, error.body.ErrorCode, error.statusCode);
            case 503:
                return new models_1.PostmarkErrors.ServiceUnavailablerError(error.body.Message, error.body.ErrorCode, error.statusCode);
            default:
                return new models_1.PostmarkErrors.UnknownError(error.body.Message, error.body.ErrorCode, error.statusCode);
        }
    };
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map