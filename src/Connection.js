import { DataMapper } from '@aws/dynamodb-data-mapper'
import Client from 'aws-sdk/clients/dynamodb'

async function getMappedItems(iterator, data = []) {
  const { done, value } = await iterator.next()
  if (!done) {
    return getMappedItems(iterator, [...data, value])
  }
  return data
}

class Connection {
  constructor({ region }, options) {
    this.options = options || { onMissing: 'skip' }
    this.client = new Client({ region: region || 'us-east-1' })
    this.mapper = new DataMapper({ client: this.client })
  }
  async query(DomainClass, key, options) {
    return getMappedItems(this.mapper.query(DomainClass, key, options))
  }

  async delete(item) {
    return this.mapper.delete({ item })
  }

  async get(DomainClass, filter) {
    if (filter instanceof Object) {
      return (await getMappedItems(this.mapper.query(DomainClass, filter)))[0]
    }
    return (await getMappedItems(this.mapper.query(DomainClass, { id: filter })))[0]
  }

  async update(item, options={}) {
    return this.mapper.update({ item }, { ...this.options, ...options})
  }

  async scan(DomainClass, options) {
    return getMappedItems(this.mapper.scan(
      DomainClass,
      options,
    ))
  }
}

export default Connection
