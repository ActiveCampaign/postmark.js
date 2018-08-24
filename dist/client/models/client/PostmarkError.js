"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PostmarkError = /** @class */ (function (_super) {
    __extends(PostmarkError, _super);
    function PostmarkError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = PostmarkError.name;
        Error.captureStackTrace(_this, PostmarkError);
        return _this;
    }
    return PostmarkError;
}(Error));
exports.PostmarkError = PostmarkError;
var PostmarkHttpError = /** @class */ (function (_super) {
    __extends(PostmarkHttpError, _super);
    function PostmarkHttpError(message, code, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.name = PostmarkHttpError.name;
        _this.code = code;
        _this.statusCode = statusCode;
        Error.captureStackTrace(_this, PostmarkHttpError);
        return _this;
    }
    return PostmarkHttpError;
}(PostmarkError));
exports.PostmarkHttpError = PostmarkHttpError;
var InvalidAPIKeyError = /** @class */ (function (_super) {
    __extends(InvalidAPIKeyError, _super);
    function InvalidAPIKeyError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        _this.name = InvalidAPIKeyError.name;
        Error.captureStackTrace(_this, InvalidAPIKeyError);
        return _this;
    }
    return InvalidAPIKeyError;
}(PostmarkHttpError));
exports.InvalidAPIKeyError = InvalidAPIKeyError;
var ApiInputError = /** @class */ (function (_super) {
    __extends(ApiInputError, _super);
    function ApiInputError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        _this.name = ApiInputError.name;
        Error.captureStackTrace(_this, ApiInputError);
        return _this;
    }
    return ApiInputError;
}(PostmarkHttpError));
exports.ApiInputError = ApiInputError;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        _this.name = InternalServerError.name;
        Error.captureStackTrace(_this, InternalServerError);
        return _this;
    }
    return InternalServerError;
}(PostmarkHttpError));
exports.InternalServerError = InternalServerError;
var ServiceUnavailablerError = /** @class */ (function (_super) {
    __extends(ServiceUnavailablerError, _super);
    function ServiceUnavailablerError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        _this.name = ServiceUnavailablerError.name;
        Error.captureStackTrace(_this, ServiceUnavailablerError);
        return _this;
    }
    return ServiceUnavailablerError;
}(PostmarkHttpError));
exports.ServiceUnavailablerError = ServiceUnavailablerError;
var UnknownError = /** @class */ (function (_super) {
    __extends(UnknownError, _super);
    function UnknownError(message, code, statusCode) {
        var _this = _super.call(this, message, code, statusCode) || this;
        _this.name = UnknownError.name;
        ;
        Error.captureStackTrace(_this, UnknownError);
        return _this;
    }
    return UnknownError;
}(PostmarkHttpError));
exports.UnknownError = UnknownError;
//# sourceMappingURL=PostmarkError.js.map