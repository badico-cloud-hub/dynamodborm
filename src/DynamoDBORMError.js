export class DynamoDBORMError extends Error {
    constructor({
        error,
        args,
        className,
        method
    }, kind, message) {
        super(message || `${kind} has being catch in ${className} on method ${method}`)
        this.name = 'DynamoDBORMError'
        this.kind = kind
        this.error = error
        this.errors = []
        this.fnData = {
            args,
            method,
            className,
        }
    }
    pushError(error, identifier) {
        this.errors.push({
            message: error.message,
            identifier,
            error
        })
    }
    mapErrors() {
        if (!this.errors.length) return {}
        return {
            errors: this.errors.map(({
                identifier,
                message,
            }) => ({
                identifier,
                message,
            })),
        }
    }

    get() {
        const { mapErrors } = this
        return {
            message: this.message,
            code: this.kind,
            ...mapErrors,
        }
    }

}