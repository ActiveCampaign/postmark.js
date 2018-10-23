export module PostmarkError {

    /**
     * Standard Postmark error on which all sub-errors are based.
     */
    export class StandardError extends Error {
        public code: number;
        public statusCode: number;

        constructor(message: string, code: number = 0, statusCode: number = 0) {
            super(message);
            this.statusCode = statusCode;
            this.code = code;

            // this is mandatory due:
            // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(this, StandardError.prototype);
            this.setUpStackTrace();
        }

        protected setUpStackTrace() {
            this.name = this.constructor.name;
            Error.captureStackTrace(this, this.constructor);
        }
    }

    export class HttpError extends StandardError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            Object.setPrototypeOf(this, HttpError.prototype);
            this.setUpStackTrace();
        }
    }

    export class InvalidAPIKeyError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            Object.setPrototypeOf(this, InvalidAPIKeyError.prototype);
            this.setUpStackTrace();
        }
    }

    export class ApiInputError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            Object.setPrototypeOf(this, ApiInputError.prototype);
            this.setUpStackTrace();
        }
    }

    export class InternalServerError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            Object.setPrototypeOf(this, InternalServerError.prototype);
            this.setUpStackTrace();
        }
    }

    export class ServiceUnavailablerError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            Object.setPrototypeOf(this, ServiceUnavailablerError.prototype);
            this.setUpStackTrace();
        }
    }

    export class UnknownError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            Object.setPrototypeOf(this, UnknownError.prototype);
            this.setUpStackTrace();
        }
    }
}






