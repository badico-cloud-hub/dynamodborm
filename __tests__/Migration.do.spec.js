import path from 'path'
import util from 'util'
import fs from 'fs'
import AggregationRoot from '../src'
import {
    getMigrationsFiles,
    Migration,
} from '../src/Migration'


process.env['DBLOCAL'] = 'http://localhost:8000'
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

jest.mock('domain-with-migrations')
jest.mock('domain-without-migrations')


const getMockCommandPath = (mockFolder) => {
  const realcommandpath = process.cwd()  
  return ({
    _package: JSON.parse(fs.readFileSync(path.join(realcommandpath, '__mocks__', mockFolder, 'package.json'))),
    comandDirPath: path.join(realcommandpath, '__mocks__', mockFolder)
  })
}

describe('Migration.do operator', () => {
  it('should exec one after other', async (done) => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new AccountDomain({
        ModelClass: AccountModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)


      return Migration.do('deploy', [], migration).then(() => {
        return done()
      })
  })

  it('should log the operation after success', () => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new AccountDomain({
        ModelClass: AccountModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)

      Migration.do('deploy', [], migration, 'Migration.do.1')
  })

  it('should log the operation after error', () => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new AccountDomain({
        ModelClass: AccountModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)

      Migration.do('deploy', [], migration, 'Migration.do.1')
  })

  it('should stop the operation after error', () => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new AccountDomain({
        ModelClass: AccountModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)

      Migration.do('deploy', [], migration, 'Migration.do.1')
  })
})

describe('Migration.do validations', () => {
    it('operation different from deploy and rollback', async (done) => {
      class ChangeLogModel {
          constructor(values) {
            Object.assign(this, values)
          }
        }
        class ChangeLogDomain extends AggregationRoot {
        }
    
        const ChangeLogMockAggregator = new AccountDomain({
          ModelClass: AccountModel,
          schema,
          className: 'ChangeLog',
          ...config,
        })
  
        const migration = new Migration(ChangeLogMockAggregator, config)
  
        
        return Migration.do('deploy', [], migration).then(() => {
          return done()
        })
    })
  
    it('fnList different from array', () => {
      class ChangeLogModel {
          constructor(values) {
            Object.assign(this, values)
          }
        }
        class ChangeLogDomain extends AggregationRoot {
        }
    
        const ChangeLogMockAggregator = new AccountDomain({
          ModelClass: AccountModel,
          schema,
          className: 'ChangeLog',
          ...config,
        })
  
        const migration = new Migration(ChangeLogMockAggregator, config)
  
        Migration.do('deploy', [], migration, 'Migration.do.1')
    })
  
    it('fnList item as function not async', () => {
      class ChangeLogModel {
          constructor(values) {
            Object.assign(this, values)
          }
        }
        class ChangeLogDomain extends AggregationRoot {
        }
    
        const ChangeLogMockAggregator = new AccountDomain({
          ModelClass: AccountModel,
          schema,
          className: 'ChangeLog',
          ...config,
        })
  
        const migration = new Migration(ChangeLogMockAggregator, config)
  
        Migration.do('deploy', [], migration, 'Migration.do.1')
    })
  
    it('fnList item as not function', () => {
        class ChangeLogModel {
            constructor(values) {
              Object.assign(this, values)
            }
          }
          class ChangeLogDomain extends AggregationRoot {
          }
      
          const ChangeLogMockAggregator = new AccountDomain({
            ModelClass: AccountModel,
            schema,
            className: 'ChangeLog',
            ...config,
          })
    
          const migration = new Migration(ChangeLogMockAggregator, config)
    
          Migration.do('deploy', [], migration, 'Migration.do.1')
      })
    it('migration different from a migration instance', () => {
      class ChangeLogModel {
          constructor(values) {
            Object.assign(this, values)
          }
        }
        class ChangeLogDomain extends AggregationRoot {
        }
    
        const ChangeLogMockAggregator = new AccountDomain({
          ModelClass: AccountModel,
          schema,
          className: 'ChangeLog',
          ...config,
        })
  
        const migration = new Migration(ChangeLogMockAggregator, config)
  
        Migration.do('deploy', [], migration, 'Migration.do.1')
    })
  })