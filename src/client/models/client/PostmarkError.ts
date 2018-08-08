export class StandardError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PostmarkError.StandardError';
    }
}
export class InvalidAPIKeyError extends StandardError {
    constructor(message: string) {
        super(message);
        this.name = 'PostmarkError.InvalidAPIKeyError';
    }
}
export class InvalidMessageError extends StandardError {
    constructor(message: string) {
        super(message);
        this.name = 'PostmarkError.InvalidMessageError';
    }
}

export class InternalServerError extends StandardError {
    constructor(message: string) {
        super(message);
        this.name = 'PostmarkError.InternalServerError';
    }

}

export class UnknownError extends StandardError {
    constructor(message: string) {
        super(message);
        this.name = 'PostmarkError.UnknownError';
    }
}






