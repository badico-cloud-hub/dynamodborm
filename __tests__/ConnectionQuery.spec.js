
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { equals } from '@aws/dynamodb-expressions';
import Client from 'aws-sdk/clients/dynamodb'
import v4 from 'uuid/v4'
import AggregationRoot from '../src'

process.env['DBLOCAL'] = 'http://localhost:8000'
process.env['STAGE'] = 'test'

const region = 'us-east-1'
const client = new Client({ region: 'localhost', endpoint: 'http://localhost:8000' })
const mapper = new DataMapper({ client })

const schema = Joi => ({
  id: {
    type: 'String',
    keyType: 'RANGE',
    validator: Joi.string(),
    defaultProvider: v4
  },
  merchantId: {
    type: 'String',
    keyType: 'HASH',
    validator: Joi.string(),
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
  documents: (embed, embedClass, itemSchema) => ({
    type: 'List',
    memberType: embed(embedClass),
    validator: Joi.any().when('kind', {
      is: 'customer',
      then: Joi.array().items(
        Joi.object().keys(itemSchema)
      ).min(1),
      otherwise:  Joi.array().items(
        Joi.object().keys(itemSchema)
      ).min(0)
    })
  }),

})

export const DocumentSchema = hasToBe => {
  
    const newHasToBe = hasToBe.extend((joi) => ({
      base: joi.string(),
      name: 'string',
      language: {
        validCpf: 'needs to be a valid cpf',
      },
      rules: [{
        name: 'validCpf',
        validate(params, value, state, options) {
          if (false) {
            // Generate an error, state and options need to be passed
            return this.createError('string.validCpf', {}, state, options);
          }
  
          return value; // Everything is OK
        }
      }]
    }))
  
    return ({
  
      id: {
        type: 'String',
        keyType: 'HASH',
        defaultProvider: v4,
        validator: newHasToBe.string().guid()
      },
      kind: {
        type: 'String',
        validator: newHasToBe.string().required().valid('cpf', 'cnpj')
      },
      documentNumber: {
        type: 'String',
        validator: newHasToBe.any()
          .when('kind',{ is: 'cpf', then: newHasToBe.string().validCpf().required(), otherwise: newHasToBe.string() })
          .required()
      },
      verified: {
        type: 'Boolean',
        validator: newHasToBe.boolean()
      },
      verifiedAt: {
        type: 'Number',
        validator: newHasToBe.string()
        //.timestamp()
      }
  
    })
  }
  
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
  it.only('should be able to query with the mapper instance', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    class DocumentModel {
        constructor(values) {
            Object.assign(this, values)
        }
    }

    class Domain extends AggregationRoot {
    }

    const { Model, connection } = new Domain({
      ModelClass: AccountModel,
      tableName: 'accounts',
      region,
      schema
    },{
        ModelClass: DocumentModel,
        schema: DocumentSchema,
        className: 'Document',
        key: 'documents'
      },
    )
    expect(Model).toBeDefined()
    const cpf = '87771502016'
    const predicate = equals(cpf);
    const filterCondition = {
        ...predicate,
        subject: 'documents[0].documentNumber'
    }
    const queryOptions = {
        filter: filterCondition
    }
    const account = new Model({ name: 'connection instantiated' })
    async function getMappedItems(iterator, data = []) {
        const { done, value } = await iterator.next()
        if (!done) {
          return getMappedItems(iterator, [...data, value])
        }
        return data
    }
    const result = await getMappedItems(connection.mapper.query(Model, {
        merchantId: '054bb857-7e57-4f32-972e-d70a30f8e793'
    }, queryOptions), [])

    expect(result[0].documents[0]).toHaveProperty('documentNumber', cpf)
    return done()
  })

  it.only('should be able to query with the connection instance', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    class DocumentModel {
        constructor(values) {
            Object.assign(this, values)
        }
    }

    class Domain extends AggregationRoot {
    }

    const { Model, connection } = new Domain({
      ModelClass: AccountModel,
      tableName: 'accounts',
      region,
      schema
    },{
        ModelClass: DocumentModel,
        schema: DocumentSchema,
        className: 'Document',
        key: 'documents'
      },
    )
    expect(Model).toBeDefined()
    const cpf = '87771502016'
    const predicate = equals(cpf);
    const filterCondition = {
        ...predicate,
        subject: 'documents[0].documentNumber'
    }
    const queryOptions = {
        filter: filterCondition
    }
  
    const result = await connection.query(Model, {
        merchantId: '054bb857-7e57-4f32-972e-d70a30f8e793'
    }, queryOptions)
    console.log(result)
    expect(result[0].documents[0]).toHaveProperty('documentNumber', cpf)
    return done()
  })

  it.only('should be able to query with the connection instance', async (done) => {
    expect.assertions(2)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    class DocumentModel {
        constructor(values) {
            Object.assign(this, values)
        }
    }

    class Domain extends AggregationRoot {
    }

    const { Model, connection } = new Domain({
      ModelClass: AccountModel,
      tableName: 'accounts',
      region,
      schema
    },{
        ModelClass: DocumentModel,
        schema: DocumentSchema,
        className: 'Document',
        key: 'documents'
      },
    )
    expect(Model).toBeDefined()
    const cpf = '87771502016'
    const queryOptions = {
        filter:
        {
            type: 'Equals',
            object: cpf,
            subject: 'documents[0].documentNumber'
        }
    }
  
    const result = await connection.query(Model, {
        merchantId: '054bb857-7e57-4f32-972e-d70a30f8e793'
    }, queryOptions)
    expect(result[0].documents[0]).toHaveProperty('documentNumber', cpf)
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

})
