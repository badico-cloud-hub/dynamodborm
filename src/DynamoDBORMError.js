export class DynamoDBORMError extends Error {
    constructor({
        error,
        args,
        className,
        details,
        method
    }, kind) {
        super(`${kind} has being catch in ${className} on method ${method}`)
        this.name = 'DynamoDBORMError'
        this.kind = kind
        this.error = error
        this.details = details
        this.fnData = {
            args,
            method,
            className,
        }
    }

    get() {
        return {
            message: this.message,
            code: this.kind,
            ...(this.details !== undefined ? { errors: this.details } : {}),
        }
    }

    details() {
        return {
            message: this.message,
            code: this.kind,
            error: this.error,
            stack: this.error.stack,
            className: this.className,
            fn: this.fnData,
        }
    }

}