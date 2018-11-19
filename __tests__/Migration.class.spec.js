import { DataMapper } from '@aws/dynamodb-data-mapper'
import util from 'util'
import Client from 'aws-sdk/clients/dynamodb'
import v4 from 'uuid/v4'
import AggregationRoot from '../src'
import { Migration } from '../src/Migration'
import Connection from '../src/Connection';

console.log('env of docker', process.env)
process.env['DBLOCAL'] = process.env['DB_PORT'] ? process.env['DB_PORT'] :'http://localhost:8000'
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

describe('Migration instantiation class', () => {
  it('Shoud me give a migration instance, that is instance of Connection and Migration', () => {
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
  })

  it('migration instance, should be able to deploy it self', async (done) => {
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

  it('migration instance, should be able to rollback it self', async (done) => {
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
      const m = await migration.dropTable(ChangeLogMockAggregator.Model)
      expect(m).toBeInstanceOf(Migration)
      return done()
    } catch(err) {
      console.log(util.inspect(err))
      expect(err).toBeUndefined()
      return done()
    }
  }, 1000000)

  it('migration instance, should be able to log a operation', async (done) => {
    expect.assertions(6)
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
      className: 'ChangeLog',
      ...config,
    })
    // aggregator definition
    expect(ChangeLogMockAggregator).toBeDefined()
    
    const migration = new Migration(ChangeLogMockAggregator, config)
    const { Repository } = ChangeLogMockAggregator
    expect(migration).toBeInstanceOf(Migration)
    expect(migration).toBeInstanceOf(Connection)
    try {
      const m = await migration.createTable(ChangeLogMockAggregator.Model)
      expect(m).toBeInstanceOf(Migration)

      await migration.log({
        operation: 'mock',
        completedAt: (new Date()).toISOString(), 
        domain: '@spark/Test',
        migrationName: 'stub',
        kind: 'stub',
        status: '1',
        // errorMessage,
        label: 't0.1.0',
        duration: 1234,
      })

      const logs = await Repository.find({
        query: {
          domain: '@spark/Test'
        }
      })

      expect(logs).toBeInstanceOf(Array)
      expect(logs[0]).toHaveProperty('migrationName', 'stub')
      await migration.dropTable(ChangeLogMockAggregator.Model)
      return done()

    } catch(err) {
      console.log(util.inspect(err))
      expect(err).toBeUndefined()
      return done()
    }
  }, 1000000)

})