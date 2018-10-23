export module PostmarkError {

    export class StandardError extends Error {
        public code: number;
        public statusCode: number;

        constructor(message: string, code: number = 0, statusCode: number = 0) {
            super(message);
            this.name = (<any>PostmarkError.StandardError).name;
            this.code = code;
            this.statusCode = statusCode;
            Error.captureStackTrace(this, PostmarkError.StandardError);
        }
    }

    export class HttpError extends StandardError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            this.name = (<any>PostmarkError.HttpError).name;
            Error.captureStackTrace(this, PostmarkError.HttpError);
        }
    }

    export class InvalidAPIKeyError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            this.name = (<any>PostmarkError.InvalidAPIKeyError).name;
            Error.captureStackTrace(this, PostmarkError.InvalidAPIKeyError);
        }
    }

    export class ApiInputError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            this.name = (<any>PostmarkError.ApiInputError).name;
            Error.captureStackTrace(this, PostmarkError.ApiInputError);
        }
    }

    export class InternalServerError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            this.name = (<any>PostmarkError.InternalServerError).name;
            Error.captureStackTrace(this, PostmarkError.InternalServerError);
        }
    }

    export class ServiceUnavailablerError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            this.name = (<any>PostmarkError.ServiceUnavailablerError).name;
            Error.captureStackTrace(this, PostmarkError.ServiceUnavailablerError);
        }
    }

    export class UnknownError extends HttpError {
        constructor(message: string, code: number, statusCode: number) {
            super(message, code, statusCode);
            this.name = (<any>PostmarkError.UnknownError).name;
            Error.captureStackTrace(this, PostmarkError.UnknownError);
        }
    }
}






