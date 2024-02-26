export class EmailAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailAlreadyExistsError';
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class InconsistencyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InconsistencyError';
    }
}

export class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenError';
    }
}