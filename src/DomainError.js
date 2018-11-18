import { DynamoDBORMError} from './DynamoDBORMError'

export class DomainError extends DynamoDBORMError {
    constructor({
        error,
        args,
        method,
        details,
    }, kind) {
        super({
            error,
            method,
            className: 'Model',
            args,
            details,
        }, kind)
        this.name = 'DomainError'
    }

}