class Repository {
  constructor(Model, connection) {
    this.Model = Model
    this.connection = connection
    this.bucket = []
  }
  async get(filter) {
    return this.connection.get(this.Model, filter)
  }

  async query(key, params) {
    this.bucket = await this.connection.query(this.Model, key, params)
    return this.bucket
  }

  async find({
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
    }
    if (!query) {
      this.bucket = await this.connection.scan(this.Model, options)
      return this.bucket
    }
    
    const { index, ...queryKeys } = query

    return this.query(queryKeys, { ...options, indexName: index })
  }
}

export default Repository
