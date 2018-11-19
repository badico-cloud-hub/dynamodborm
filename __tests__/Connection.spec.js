import { DataMapper } from '@aws/dynamodb-data-mapper'
import util from 'util'
import Client from 'aws-sdk/clients/dynamodb'
import v4 from 'uuid/v4'
import AggregationRoot from '../src'
import Connection from '../src/Connection';

process.env['DBLOCAL'] = process.env['DB_PORT_8000'] ? process.env['DB_ENDPOINT'] :'http://localhost:8000'
process.env['STAGE'] = 'test'


const config = {
  region: 'us-east-1',
  tableName: 'migrations',
  readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
  writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
  indexes: [
      {
          name: 'label-completedAt-index',
          readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
          writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
          type: 'global',
          projection: 'all'
      }
  ]
}
const schema = hasToBe => ({
  domain: {
    type: 'String',
    keyType: 'HASH',
    validator: hasToBe.string().required(),
  },
  appliedBy: {
    type: 'String',
    validator: hasToBe.string(),
  },
  migrationName: {
    type: 'String',
    validator: hasToBe.string().required()
  },
  operation: {
    type: 'String',
    validator: hasToBe.string().valid('deploy', 'rollback').required()
  },
  duration: {
    type: 'Number',
    validator: hasToBe.number(),
  },
  errorMessage: {
    type: 'Any',
    validator: hasToBe.any(),
  },
  kind: {
    type: 'String',
    validator: hasToBe.string(),
  },
  status: {
    type: 'Number',
    validator: hasToBe.number().valid(1, 0),
  },
  label: {
    type: 'String',
    indexKeyConfigurations: {
      'label-completedAt-index': 'HASH'
    },
    validator: hasToBe.string()
  },
  completedAt: {
    type: 'String',
    keyType: 'RANGE',
    indexKeyConfigurations: {
      'label-completedAt-index': 'RANGE'
    },
    validator: hasToBe.string().required()
  },
})



describe('Connection instantiation class', () => {
  it('Shoud me give a migration instance, that is instance of Connection', () => {
    const connection = new Connection(config)

    expect(connection).toBeInstanceOf(Connection)
  })

  // to be write on next task
  it.skip('connection instance, should be able to create a item - update method', async (done) => {
    expect.assertions(4)
    class AccountModel {
      constructor(values) {
        Object.assign(this, values)
      }
    }
    class AccountDomain extends AggregationRoot {
    }

    const ChangeLogMockAggregator = new AccountDomain({
      ModelClass: AccountModel,
      schema,
      ...config,
    })
    // aggregator definition
    expect(ChangeLogMockAggregator).toBeDefined()
    
    const migration = new Migration(ChangeLogMockAggregator, config)

    expect(migration).toBeInstanceOf(Migration)
    expect(migration).toBeInstanceOf(Connection)
    try {
      const m = await migration.createTable(ChangeLogMockAggregator.Model)
      expect(m).toBeInstanceOf(Migration)
      return done()
    } catch(err) {
      console.log(util.inspect(err))
      expect(err).toBeUndefined()
      return done()
    }
  }, 1000000)

  // get

  // query

  // scan

  // delete
 
})