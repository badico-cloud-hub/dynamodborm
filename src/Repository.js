class Repository {
  constructor(Model, connection) {
    this.Model = Model
    this.connection = connection
    this.bucket = []
  }
  async get(filter) {
    return this.connection.get(this.Model, filter)
  }

  async query(params) {
    const options = {
      pageSize: pageSize || limit || 10,
      limit: limit || pageSize || 100
    }
    this.bucket = await this.connection.query(this.Model, params)
    return this.bucket
  }

  async find({
    pageSize,
    lastIndex,
    query,
    indexKey,
    limit
  } = {}) {
    const options = {
      pageSize: pageSize || limit || 25,
      startKey: lastIndex && new this.Model({ [indexKey || 'id']: lastIndex }),
      limit: limit || pageSize || 25
    }
    if (!query) {
      this.bucket = await this.connection.scan(this.Model, options)
      return this.bucket
    }

    return this.query(query)
  }
}

export default Repository
