import { DynamoDBORMError} from './DynamoDBORMError'

export class DomainError extends DynamoDBORMError {
    constructor(argz, kind, message) {
        super({
            ...argz,
            className: 'Model',
        }, kind, message)
        this.name = 'DomainError'
    }
}