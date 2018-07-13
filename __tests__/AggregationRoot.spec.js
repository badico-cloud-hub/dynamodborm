
import { DataMapper } from '@aws/dynamodb-data-mapper'
import Client from 'aws-sdk/clients/dynamodb'
import v4 from 'uuid/v4'
import AggregationRoot from '../index'

const region = 'us-east-1'
const client = new Client({ region })
const mapper = new DataMapper({ client })

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

const tableName = 'accounts'


describe('AggregationRoot class', () => {
  it('should be able to give me a repository, a model and a connection', () => {
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    class AccountDomain extends AggregationRoot {
    }

    const {
      Repository,
      Model,
      connection
    } = new AccountDomain({
      ModelClass: AccountModel,
      tableName,
      region,
      schema
    })

    expect(Repository).toBeDefined()
    expect(Model).toBeDefined()
    expect(connection).toBeDefined()
  })

  it('should be able to give me a working Model connection', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class Domain extends AggregationRoot {
    }

    const {
      Model
    } = new Domain({
      ModelClass: AccountModel,
      tableName,
      region,
      schema
    })
    expect(Model).toBeDefined()
    const account = new Model({ name: 'Connection on Aggregation' })
    const result = await mapper.update({ item: account }, { onMissing: 'skip' })
    expect(result).toHaveProperty('id')
    return done()
  })

  it('should be able to give a connection instance inside my domain', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class Domain extends AggregationRoot {
    }

    const { Model, connection } = new Domain({
      ModelClass: AccountModel,
      tableName,
      region,
      schema
    })
    expect(Model).toBeDefined()
    const account = new Model({ name: 'connection instantiated' })
    const result = await connection.update(account)
    expect(result).toHaveProperty('id')
    return done()
  })
  // moved to repository spec
  it.skip('Repository instantiantion', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class Domain extends AggregationRoot {
    }

    const { Repository } = new Domain({
      ModelClass: AccountModel,
      tableName,
      region: 'us-east-1',
      schema
    })

    const result = await Repository.find()
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(AccountModel)
    return done()
  })

  it.skip('Return of repository should have the common applied methods', async (done) => {
    expect.assertions(5)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class Domain extends AggregationRoot {
    }

    const { Repository } = new Domain({
      ModelClass: AccountModel,
      tableName,
      schema
    })
    const result = await Repository.find()
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(AccountModel)
    expect(result[0].get()).toHaveProperty('id')
    expect(result[0].get()).toHaveProperty('name')
    expect(result[0].get('name')).toBeTruthy()
    return done()
  })

  it.skip('Return of repository should have the specifc applied methods', async (done) => {
    expect.assertions(4)
  
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
        this.random = Math.random()
      }

      getSomeEspecficThing() {
        return this.random
      }
    }

    class Domain extends AggregationRoot {
    }

    const { Repository } = new Domain({
      ModelClass: AccountModel,
      tableName,
      region: 'us-east-1',
      schema
    })
    const result = await Repository.find()
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(AccountModel)
    expect(result[0].get()).toHaveProperty('id')
    expect(result[0].getSomeEspecficThing()).toBeTruthy()
    return done()
  })

  it('should be constructed a recursive model base on aggregationRoot', async (done) => {
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
        city: { type: 'String', validator: Joi.string(), }
      })
    })
    expect(Address).toBeDefined()
    const address = new Address({ city: 'teste' })
    expect(address).toHaveProperty('city', 'teste')
    return done()
  })

  it('should the recursively generated model have the common methods', async (done) => {
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
      schema: embedSchema
    }, {
      key: 'address',
      className: 'Address',
      ModelClass: AddressModel,
      schema: Joi => ({
        cep: { type: 'String', validator: Joi.string() },
        city: { type: 'String', validator: Joi.string() }
      })
    })
    const address = new Address({ city: 'teste', cep: 'cepTeste' })
    expect(address.get()).toHaveProperty('city', 'teste')
    expect(address.get('cep')).toBe('cepTeste')
    return done()
  })
})
