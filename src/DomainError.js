import { DynamoDBORMError} from './DynamoDBORMError'

export class DomainError extends DynamoDBORMError {
    constructor({
        error,
        args,
        method,
        identifier,
        details,
        message,
        errors
    }, kind) {
        super({
            error,
            method,
            className: 'Model',
            args,
            message,
            details,
        }, kind)
        this.name = 'DomainError'
        this.identifier = identifier
        this.errors = errors
    }
}

DomainError.fromArray = (errors, kind, message) => {
    return new DomainError({
        errors,
        message,
        details: errors.map(e => ({
            identifier: e.identifier,
            message: e.error.message,
        }))
    }, kind)
}