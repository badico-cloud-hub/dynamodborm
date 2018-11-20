import { DynamoDBORMError} from './DynamoDBORMError'

export class DomainError extends DynamoDBORMError {
    constructor(argz, kind) {
        super({
            ...argz,
            className: 'Model',
        }, kind)
        this.name = 'DomainError'
    }
}