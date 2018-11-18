import { DynamoDBORMError } from "./DynamoDBORMError";

class Repository {
  constructor(Model, connection) {
    this.Model = Model
    this.connection = connection
    this.bucket = []
  }
  async get(filter) {
    const bucket = this.connection.get(this.Model, filter)
    if (!bucket.length) throw new DynamoDBORMError({
        error: new Error('The item searched was not found'),
        args: [filter],
        className: 'Repository',
        method: 'get'
    }, 'NotFoundItem')
    return bucket
  }

  async query(key, params) {
    this.bucket = await this.connection.query(this.Model, key, params)
    return this.bucket
  }

  async find({
    scanIndexForward,
    pageSize,
    lastIndex,
    filter,
    query,
    indexKey,
    limit
  } = {}) {
    const options = {
      pageSize: pageSize || limit || 25,
      startKey: lastIndex && new this.Model({ [indexKey || 'id']: lastIndex }),
      limit: limit || pageSize || 25,
      filter,
      scanIndexForward,
    }
    if (!query) {
      this.bucket = await this.connection.scan(this.Model, options)
      return this.bucket
    }
    
    const { index, ...queryKeys } = query

    return this.query(queryKeys, { ...options, index })
  }
}

export default Repository
