import { DataMapper } from '@aws/dynamodb-data-mapper'
import Client from 'aws-sdk/clients/dynamodb'
import { DynamoDBORMError } from './DynamoDBORMError'

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

    /**
     * DBLOCALregion: 'localhost',
     * endpoint: 'http://localhost:8000'
    */
    if (process.env['DBLOCAL']) {
      this.client = new Client({
        region: 'localhost',
        endpoint: process.env['DBLOCAL']
      })
    } else {
      this.client = new Client({ region: region || 'us-east-1' })
    }
    this.mapper = new DataMapper({ client: this.client })
  }
  async query(DomainClass, keys, {index, filter, ...options }) {
    try {
      const params = { ...options }
      if (filter) {
        Object.assign(params, { filter })
      }
  
      if (index) {
        Object.assign(params, { indexName: index })
      }
      
      return getMappedItems(
        this.mapper.query(
          DomainClass, keys, params
        ),
      )
    } catch (error) {
      throw new DynamoDBORMError({
        error,
        method: 'query',
        className: 'Connection',
        args: [ DomainClass, keys, {index, filter, ...options }]
      },
      'ConnectionError',
      )
    }
  }

  async delete(item) {
    try {
    return this.mapper.delete({ item })
    } catch (error) {
      throw new DynamoDBORMError({
        error,
        method: 'delete',
        className: 'Connection',
        args: [ item ]
      },
      'ConnectionError',
      )
    }
  }

  async get(DomainClass, { index, ...keys}) {
    try {
      if (index) {
        const list = await getMappedItems(
          this.mapper.query(
            DomainClass, keys, { indexName: index }
          ),
        )

        if (list.length > 1) {
          throw new Error('Not unique item')
        }
        return list[0]
      }
      return (await getMappedItems(this.mapper.query(DomainClass, keys)))[0]
    } catch (error) {
      throw new DynamoDBORMError({
        error,
        method: 'get',
        className: 'Connection',
        args: [ DomainClass, { index, ...keys} ]
      },
      'ConnectionError',
      )
    }
  }

  async update(item, options={}) {
    try {
      return this.mapper.update({ item }, { ...this.options, ...options})
    } catch (error) {
      throw new DynamoDBORMError({
        error,
        method: 'update',
        className: 'Connection',
        args: [ DomainClass, options ]
      },
      'ConnectionError',
      )
  }
  }

  async scan(DomainClass, options) {
    try {
      return getMappedItems(this.mapper.scan(
        DomainClass,
        options,
      ))
    } catch (error) {
      throw new DynamoDBORMError({
        error,
        method: 'scan',
        className: 'Connection',
        args: [ DomainClass,  options ]
      },
      'ConnectionError',
      )
    }
  }
}

export default Connection
