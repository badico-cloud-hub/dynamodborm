import {
  AttributePath,
  AttributeValue,
  equals,
  ExpressionAttributes
} from '@aws/dynamodb-expressions'

import Repository from '../src/Repository'
import Connection from '../src/Connection'
import { Migration } from '../src/Migration'
import ChangeLogAggregator from '../migrate/changelog-domain'
import config from '../migrate/changelog-domain/config'

import aggregationRootModel, { Model } from '../src/Model'
import v4 from 'uuid/v4'

// process.env['DBLOCAL'] = 'http://localhost:8000'
process.env['STAGE'] = 'test'

const region = 'us-east-1'
const connection = new Connection({ region })
const schema = Joi => ({
  id: {
    type: 'String',
    keyType: 'HASH',
    validator: Joi.any,
    defaultProvider: v4
  },
  cpf: {
    validator: Joi.any,
    type: 'Number',
    indexKeyConfigurations: {
      'cpf-name-Index': 'HASH'
    }
  },
  name: {
    validator: Joi.any,
    type: 'String',
    indexKeyConfigurations: {
      'cpf-name-Index': 'RANGE'
    }
  },
  parent: {
    validator: Joi.any,
    type: 'String'
  },
  email: {
    validator: Joi.any,
    type: 'String',
  },
  
})

const tableName = 'accounts'
const migration = new Migration(ChangeLogAggregator, { region }) 

describe('Repository', () => {
  beforeAll( async() => {
    const root = {}
    class Account {
      constructor(values = {}) {
        Object.assign(this, values)
      }
    }
    aggregationRootModel(connection, root, {
      ModelClass: Account,
      className: 'Account',
      schema,
      ...config,
      tableName,
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })
    await migration.dropTable(Account)
    await migration.createTable(Account)
    const acc1 = new Account({
      name: 'm1',
      cpf: '0112'
    })
    const acc2 = new Account({
      cpf: '0111',
      name: 'm2',
    })
    const acc3 = new Account({
      cpf: '0111',
      name: 'm3',
    })

    await acc1.save()
    await acc2.save()
    await acc3.save()
    await migration.createTable(ChangeLogAggregator.Model)
  })
  afterAll( async() => {
    const root = {}
    class Account {
      constructor(values = {}) {
        Object.assign(this, values)
      }
    }
    aggregationRootModel(connection, root, {
      ModelClass: Account,
      className: 'Account',
      schema,
      ...config,
      tableName,
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })
    await migration.dropTable(Account)
    await migration.dropTable(ChangeLogAggregator.Model)
  })
  it('Repository instantiantion', (done) => {
    expect.assertions(1)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const root = {}

    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema, ...config,
      tableName,
      className: 'Account',
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })

    const repository = new Repository(root.Model, connection)
    expect(repository).toBeInstanceOf(Repository)
    return done()
  }, 10000)

  it('should return a list of aggregation root class', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const root = {}
    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account',
      ...config,
      tableName,
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })

    const repository = new Repository(root.Model, connection)
    const result = await repository.find()
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(AccountModel)
    return done()
  }, 10000)
  it('should have a method get for use Id as key', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const root = {}

    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account',
      ...config,
      tableName,
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })
    const account = new root.Model({ name: 'mock' })
    const { id } = await connection.update(account)

    const repository = new Repository(root.Model, connection)
    const result = await repository.get({ id })
    expect(result).toBeInstanceOf(AccountModel)
    expect(result.get('id')).toBe(id)
    return done()
  }, 10000)

  it.skip('iterator from mapper should work properly in paginator', async (done) => {
    const root = {}
    const { mapper } = connection
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account'
    })

    let paginator = mapper.scan(
      root.Model,
      {
        limit: 9,
        pageSize: 3
      }
    ).pages()
    let bucket = []
    for await (const page of paginator) {
      bucket.push(page)
    }

    const lastKey1 = paginator.lastEvaluatedKey


    paginator = mapper.query(
      root.Model,
      {
        limit: 9,
        startKey: lastKey1,
        pageSize: 3
      }
    ).pages()
    bucket = []
    for await (const page of paginator) {
      bucket.push(page)
    }

    const lastKey2 = paginator.lastEvaluatedKey
    expect(lastKey1.id).not.toBe(lastKey2.id)
    return done()
  }, 10000)

  it('should find build a expression - limit', async (done) => {
    expect.assertions(2)
    const root = {}
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account',
      ...config,
      tableName,
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })

    const repository = new Repository(root.Model, connection)
    const params = { pageSize: 3 }
    const result = await repository.find(params)
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(3)
    return done()
  }, 10000)

  it('should find build a expression - limit, pageSize & lastId', async (done) => {
    expect.assertions(2)
    const root = {}
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account',
      ...config,
      tableName,
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })
    const addAcc = async number => (new root.Model({
      name: `mm=${number}`,
      cpf: `${number}`,
    }).save()) 
    await Promise.all([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21].map(addAcc))
    const repository = new Repository(root.Model, connection)
    const params = { pageSize: 10 }
    let result = await repository.find(params)
    const lastId1 = result[9].id
    params.lastIndex = lastId1
    result = await repository.find(params)
    expect(result).toHaveLength(10)
    const lastId2 = result[9].id
    expect(lastId1).not.toBe(lastId2)
    return done()
  }, 15000)

  it.skip('should find build a expression - index', async (done) => {
    expect.assertions(2)
    const root = {}
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account',
      ...config,
      tableName,
      indexes: [
        {
          name: 'cpf-name-Index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
      ]
    })

    const repository = new Repository(root.Model, connection)
    const params = { pageSize: 10 }
    let result = await repository.find({
      query: {
        user: 'Foo',
        index: 'your-index-name'
      }
    })
    const lastId1 = result[9].id
    params.lastIndex = lastId1
    result = await repository.find(params)
    expect(result).toHaveLength(10)
    const lastId2 = result[9].id
    expect(lastId1).not.toBe(lastId2)
    return done()
  }, 10000)

  // for now not working with this cases
  it.skip('query shold work properly', async (done) => {
    const root = {}
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const { mapper, client } = connection
    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account'
    })
    const expAttr = new ExpressionAttributes()
    const equalsExpressionPredicate = equals('mock_1')
    const toFind = new root.Model({ name: 'mock_1' })

    const paginator = mapper.query(
      root.Model,
      toFind,
      {
        limit: 9,
        pageSize: 3
      }
    ).pages()
    const bucket = []
    for await (const page of paginator) {
      console.log(page)
      bucket.push(page)
    }


    return done()
  }, 10000)

  it.skip('should find by a search key, as name, from query params', async (done) => {
    expect.assertions(1)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const root = {}
    aggregationRootModel(connection, root, {
      ModelClass: AccountModel,
      tableName,
      schema,
      className: 'Account'
    })
    const repository = new Repository(root.Model, connection)
    const toFind = new root.Model({ name: 'mock_1' })
    const params = {
      pageSize: 10,
      query: toFind
    }
    const result = await repository.find(params)
    expect(1).toBe(2)
    return done()
  }, 15000)

  // filters
})
