export class PostmarkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = (<any>PostmarkError).name;
        Error.captureStackTrace(this, PostmarkError);
    }
}

export class PostmarkHttpError extends PostmarkError {
    public code: number;
    public statusCode: number;

    constructor(message: string, code: number, statusCode: number) {
        super(message);
        this.name = (<any>PostmarkHttpError).name;
        this.code = code;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, PostmarkHttpError);
    }
}

export class InvalidAPIKeyError extends PostmarkHttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        this.name =  (<any>InvalidAPIKeyError).name;
        Error.captureStackTrace(this, InvalidAPIKeyError);
    }
}

export class ApiInputError extends PostmarkHttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        this.name = (<any>ApiInputError).name;
        Error.captureStackTrace(this, ApiInputError);
    }
}

export class InternalServerError extends PostmarkHttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        this.name = (<any>InternalServerError).name;
        Error.captureStackTrace(this, InternalServerError);
    }
}

export class ServiceUnavailablerError extends PostmarkHttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        this.name = (<any>ServiceUnavailablerError).name;
        Error.captureStackTrace(this, ServiceUnavailablerError);
    }
}

export class UnknownError extends PostmarkHttpError {
    constructor(message: string, code: number, statusCode: number) {
        super(message, code, statusCode);
        this.name = (<any>UnknownError).name;;
        Error.captureStackTrace(this, UnknownError);
    }
}






