const {
    default: AggregationRoot,
    Model,
    DynamoDBORMError,
    DomainError,
    appendCustomMethods,
    Migration,
} = require('./')

export function DynamoDBORMProvider(c) {
    c.service('AggregationRoot', () => AggregationRoot)
    c.service('Model', () => Model)
    c.service('DynamoDBORMError', () => DynamoDBORMError)
    c.service('DomainError', () => DomainError)
    c.service('Migration', () => Migration)
    c.service('appendCustomMethods', () => appendCustomMethods)
}

