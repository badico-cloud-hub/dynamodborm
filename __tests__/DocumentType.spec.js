import { DataMapper } from '@aws/dynamodb-data-mapper'
import Client from 'aws-sdk/clients/dynamodb'
import v4 from 'uuid/v4'
import AggregationRoot from '../src'
const region = 'us-east-1'
const client = new Client({ region })
const mapper = new DataMapper({ client })

const tableName = 'stubs'

describe('Document feature', () => {
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
  it('should LIST  work', async (done) => {
    expect.assertions(2)

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
    const { Address } = new Domain({
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
    expect(Address).toBeDefined()
    const address = new Address({ cep: 'teste' })
    expect(address).toHaveProperty('cep', 'teste')
    return done()
  })

  it('should MAP  instantiate a Map class', async (done) => {
    expect.assertions(2)

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
    const { Address } = new Domain({
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
    expect(Address).toBeDefined()
    const address = new Address({ cep: 'teste' })
    expect(address).toHaveProperty('cep', 'teste')
    return done()
  })

  it('should MAP  instantiate a Map class', async (done) => {
    expect.assertions(2)

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
    const { Address } = new Domain({
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
    expect(Address).toBeDefined()
    const address = new Address({ cep: 'teste' })
    expect(address).toHaveProperty('cep', 'teste')
    return done()
  })

  it('should MAP  instantiate be abble to save on table', async (done) => {
    expect.assertions(2)

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
        type: 'Document',
        members: Class
      })
    })
    const { Address, Account } = new Domain({
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
    expect(Address).toBeDefined()
    expect(Account).toBeDefined()
    const address = new Address({ cep: 'teste' })
    const account = new Account({
        name: 'teste',
        address
    })
    await account.save()
    console.log(account)
    expect(address).toHaveProperty('cep', 'teste')
    expect(account).toHaveProperty('id')
    return done()
  })
})