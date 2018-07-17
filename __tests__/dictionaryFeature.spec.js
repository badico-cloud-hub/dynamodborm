
import { DataMapper } from '@aws/dynamodb-data-mapper'
import Client from 'aws-sdk/clients/dynamodb'
import v4 from 'uuid/v4'
import AggregationRoot from '../src'
import { save } from '../src/helpers/commonMethods';

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

const tableName = 'accounts' // TODO: change the table for tests


describe('Dictionary behavior', () => {
  it('should be abble to retrieve the model domain', async (done) => {
    expect.assertions(4)
    class DomainModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class SubDomainModel {
        constructor(values) {
          Object.assign(this, values)
        }
    }

    const subDomainSchema = hasToBe => ({
        number: {
            type: 'String',
            validator: hasToBe.string()
        }
    })
    
    const domainSchema = hasToBe => ({
        id: {
          type: 'String',
          keyType: 'HASH',
          validator: hasToBe.string(),
          defaultProvider: v4
        },
        parent: {
          type: 'String',
          validator: hasToBe.string()
        },
        name: {
          type: 'String',
          validator: hasToBe.string()
        },
        email: {
          type: 'String',
          validator: hasToBe.string()
        },
        cpf: {
          type: 'Number',
          validator: hasToBe.any()
        },
        phones: (embed, EmbedModel) => ({
            type: 'List',
            memberType: embed(EmbedModel),
            validator: hasToBe.array()
        })
    })

    const { SubDomain, Domain, Repository, connection } = new AggregationRoot({
      tableName,
      region,
      className: 'Domain',
      ModelClass: DomainModel,
      schema: domainSchema
    },{
        ModelClass: SubDomainModel,
        schema: subDomainSchema,
        className: 'SubDomain',
        key: 'phones'
    })

    expect(connection).toBeDefined()
    expect(Repository).toBeDefined()
    expect(Domain).toBeDefined()
    expect(SubDomain).toBeDefined()
    return done()
  })

  it('should be abble to save and retrieve a item from dynamo', async (done) => {
    expect.assertions(3)
    class DomainModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class SubDomainModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }

    const subDomainSchema = hasToBe => ({
        number: {
            type: 'String',
            validator: hasToBe.string()
        }
    })
    const domainSchema = hasToBe => ({
        id: {
          type: 'String',
          keyType: 'HASH',
          validator: hasToBe.string(),
          defaultProvider: v4
        },
        parent: {
          type: 'String',
          validator: hasToBe.string()
        },
        name: {
          type: 'String',
          validator: hasToBe.string()
        },
        email: {
          type: 'String',
          validator: hasToBe.string()
        },
        cpf: {
          type: 'Number',
          validator: hasToBe.any()
        },
        phones: (embed, EmbedModel) => ({
            type: 'List',
            memberType: embed(EmbedModel),
            validator: hasToBe.array()
        })
      })
      

    const { SubDomain, Domain, Repository, connection } = new AggregationRoot({
      tableName,
      region,
      className: 'Domain',
      ModelClass: DomainModel,
      schema: domainSchema
    },{
        ModelClass: SubDomainModel,
        schema: subDomainSchema,
        className: 'SubDomain',
        key: 'phones'
    })
    const item = new Domain({
        name: 'item domain'
    })
    const { id } = await connection.update(item)
    expect(id).toBeTruthy()

    const retrievedItem = await Repository.get(id)
    expect(retrievedItem).toHaveProperty('id', id)
    expect(retrievedItem).toHaveProperty('name', item.name)
    return done()
  })

  it('should be abble to save and retrieve a item with a list from dynamo', async (done) => {
    expect.assertions(4)
    class DomainModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class SubDomainModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }

    const subDomainSchema = hasToBe => ({
        number: {
            type: 'String',
            validator: hasToBe.string()
        }
    })
    const domainSchema = hasToBe => ({
        id: {
          type: 'String',
          keyType: 'HASH',
          validator: hasToBe.string(),
          defaultProvider: v4
        },
        parent: {
          type: 'String',
          validator: hasToBe.string()
        },
        name: {
          type: 'String',
          validator: hasToBe.string()
        },
        email: {
          type: 'String',
          validator: hasToBe.string()
        },
        cpf: {
          type: 'Number',
          validator: hasToBe.any()
        },
        phones: (embed, EmbedModel) => ({
            type: 'List',
            memberType: embed(EmbedModel),
            validator: hasToBe.array()
        })
      })
      

    const { SubDomain, Domain, Repository, connection } = new AggregationRoot({
      tableName,
      region,
      className: 'Domain',
      ModelClass: DomainModel,
      schema: domainSchema
    },{
        ModelClass: SubDomainModel,
        schema: subDomainSchema,
        className: 'SubDomain',
        key: 'phones'
    })
    const item = new Domain({
        name: 'item domain',
        phones: [{
            number: 'teste number' 
        }]
    })
    const { id, phones } = await connection.update(item)
    expect(id).toBeTruthy()
    expect(phones).toBeInstanceOf(Array)

    const retrievedItem = await Repository.get(id)
    expect(retrievedItem).toHaveProperty('id', id)
    expect(retrievedItem.phones[0]).toHaveProperty('number', item.phones[0].number)
    return done()
  })

  it('should be abble to VALIDATE a item from dynamo', async (done) => {
    expect.assertions(2)
    class DomainModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class SubDomainModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }

    const subDomainSchema = hasToBe => ({
        number: {
            type: 'String',
            validator: hasToBe.string()
        }
    })
    const domainSchema = hasToBe => ({
        id: {
          type: 'String',
          keyType: 'HASH',
          validator: hasToBe.string(),
          defaultProvider: v4
        },
        parent: {
          type: 'String',
          validator: hasToBe.string()
        },
        name: {
          type: 'String',
          validator: hasToBe.number()
        },
        email: {
          type: 'String',
          validator: hasToBe.string()
        },
        cpf: {
          type: 'Number',
          validator: hasToBe.any()
        },
        phones: (embed, EmbedModel) => ({
            type: 'List',
            memberType: embed(EmbedModel),
            validator: hasToBe.array()
        })
      })
      

    const {
        SubDomain,
        Domain,
        Repository,
        connection,
        parseFields,
    } = new AggregationRoot({
      tableName,
      region,
      className: 'Domain',
      ModelClass: DomainModel,
      schema: domainSchema
    },{
      ModelClass: SubDomainModel,
      schema: subDomainSchema,
      className: 'SubDomain',
      key: 'phones'
    })

    const item = {
        name: 'lucas'
    }
    const savedItem = await connection.update(
        new Domain(parseFields(item))
    )

    expect(savedItem).toBeDefined()
    try {
        await savedItem.validate()
    } catch (err) {
        expect(err).toBeDefined()
        return done()
    }   
  })

  it('should be abble to Validade a List attr and retrieve', async (done) => {
    expect.assertions(2)
    class DomainModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }

    class SubDomainModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }

    const subDomainSchema = hasToBe => ({
        number: {
            type: 'String',
            validator: hasToBe.number()
        }
    })
    const domainSchema = hasToBe => ({
        id: {
          type: 'String',
          keyType: 'HASH',
          validator: hasToBe.string(),
          defaultProvider: v4
        },
        parent: {
          type: 'String',
          validator: hasToBe.string()
        },
        name: {
          type: 'String',
          validator: hasToBe.string()
        },
        email: {
          type: 'String',
          validator: hasToBe.string()
        },
        cpf: {
          type: 'Number',
          validator: hasToBe.any()
        },
        phones: (embed, embedClass, embedSchema) => ({
            type: 'List',
            validator: hasToBe.array().items(hasToBe.object().keys(embedSchema))
        })
      })

    const {
        SubDomain,
        Domain,
        Repository,
        connection,
        parseFields,
    } = new AggregationRoot({
      tableName,
      region,
      className: 'Domain',
      ModelClass: DomainModel,
      schema: domainSchema
    },{
      ModelClass: SubDomainModel,
      schema: subDomainSchema,
      className: 'SubDomain',
      key: 'phones'
    })

    const item = parseFields({
        name: 'lucas',
        foo: 1,
        phones: [
            {
              number: 'wrong'
            }
        ]
    })
    const itemToSave =  new Domain(item)
    console.log({item, itemToSave })
    const savedItem = await connection.update(itemToSave)
    console.log('@4', savedItem)
    expect(savedItem).toBeDefined()
    
    try {
      await savedItem.validate()
    } catch (err) {
        expect(err).toBeDefined()
        return done()
    }   
  })

  
})
