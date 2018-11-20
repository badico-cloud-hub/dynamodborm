export class DynamoDBORMError extends Error {
    constructor({
        error,
        errors,
        args,
        className,
        method
    }, code, message) {
        super(message || `${code} has being catch in ${className} on method ${method}`)
        this.name = 'DynamoDBORMError'
        this.code = code
        if (error) {
            this.error = error
        }
        if (errors) {
            this.errors = errors
        }
        this.fnData = {
            args,
            method,
            className,
        }

        Error.captureStackTrace(this, this.constructor);
    }

}
function mapErrors(errors) {
     return errors.map((error) => ({
        identifier: error.code,
        message: error.message,
        ...error,
    }))
}

DynamoDBORMError.fromArray = (errors, kind, message) =>
    new DynamoDBORMError({
      ...errors[0],
      error: undefined,  
      errors: mapErrors(errors),
    }, kind, message)