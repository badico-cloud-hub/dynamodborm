import { DataMapper } from '@aws/dynamodb-data-mapper'
import Client from 'aws-sdk/clients/dynamodb'
import v4 from 'uuid/v4'
import AggregationRoot from '../src'

process.env['DBLOCAL'] = process.env['DB_PORT'] ? process.env['DB_PORT'] :'http://localhost:8000'
process.env['STAGE'] = 'test'

const region = 'us-east-1'
const client = new Client({ region: 'localhost', endpoint: process.env['DBLOCAL'] })
const mapper = new DataMapper({ client })

const tableName = 'stubs'

describe('TableName seted with STAGE env var', () => {
    const schema = Joi => ({
        id: {
        type: 'String',
        keyType: 'HASH',
        validator: Joi.string(),
        defaultProvider: v4
        },
        parent: {
        type: 'String',
        validator: Joi.string()
        },
        name: {
        type: 'String',
        validator: Joi.string()
        },
        email: {
        type: 'String',
        validator: Joi.string()
        },
        cpf: {
        type: 'Number',
        validator: Joi.any()
        }
    })
  it('should have a prod version of TABLENAME', async (done) => {
    expect.assertions(2)
    process.env['STAGE'] = 'prod'
    class Domain extends AggregationRoot {
    }
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class AddressModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class FooModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const embedSchema = Joi => ({
      ...schema(Joi),
      address: (embed, Class) => ({
        type: 'List',
        memberType: embed(Class)
      })
    })
    const { Model } = new Domain({
      ModelClass: AccountModel,
      tableName,
      region: 'us-east-1',
      className: 'Account',
      schema: embedSchema
    }, {
      key: 'address',
      className: 'Address',
      ModelClass: AddressModel,
      schema: Joi => ({
        cep: { type: 'String', validator: Joi.string(), },
        city: { type: 'String', validator: Joi.string(), },
      })
    },
)
    expect(Model.tableName).toBeDefined()
    expect(Model.tableName).toBe(tableName)
    return done()
  })

  it('should have a related version of STAGE of env vars on posfix of TABLENAME', async (done) => {
    expect.assertions(2)
    const stage = 'bananinha'
    process.env['STAGE'] = stage
    class Domain extends AggregationRoot {
    }
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class AddressModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class FooModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const embedSchema = Joi => ({
      ...schema(Joi),
      address: (embed, Class) => ({
        type: 'Map',
        memberType: embed(Class)
      })
    })
    const { Model } = new Domain({
      ModelClass: AccountModel,
      tableName,
      region: 'us-east-1',
      className: 'Account',
      schema: embedSchema
    }, {
      key: 'address',
      className: 'Address',
      ModelClass: AddressModel,
      schema: Joi => ({
        cep: { type: 'String', validator: Joi.string(), },
        city: { type: 'String', validator: Joi.string(), },
      })
    },
)
    expect(Model.tableName).toBeDefined()
    expect(Model.tableName).toBe(`${tableName}-${stage}`)
    return done()
  })

  it('should have a related dev posfix of TABLENAME, when STAGE env var is undefined', async (done) => {
    expect.assertions(2)
    process.env['STAGE'] = undefined
    class Domain extends AggregationRoot {
    }
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class AddressModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class FooModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    const embedSchema = Joi => ({
      ...schema(Joi),
      address: (embed, Class) => ({
        type: 'Map',
        memberType: embed(Class)
      })
    })
    const { Model } = new Domain({
      ModelClass: AccountModel,
      tableName,
      region: 'us-east-1',
      className: 'Account',
      schema: embedSchema
    }, {
      key: 'address',
      className: 'Address',
      ModelClass: AddressModel,
      schema: Joi => ({
        cep: { type: 'String', validator: Joi.string(), },
        city: { type: 'String', validator: Joi.string(), },
      })
    },
)
    expect(Model.tableName).toBeDefined()
    expect(Model.tableName).toBe(`${tableName}-dev`)
    return done()
  })

})