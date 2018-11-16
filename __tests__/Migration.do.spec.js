import AggregationRoot from '../src'
import {
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

describe('Migration.do operator', () => {
  it('should exec one after other', async (done) => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new ChangeLogDomain({
        ModelClass: ChangeLogModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)


      return Migration.do('deploy', [], migration).then(() => {
        return done()
      })
  })

  it('should promissify fnList item if the function is not async', () => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new ChangeLogDomain({
        ModelClass: ChangeLogModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)

      Migration.do('deploy', [], migration, 'Migration.do.1')
  })

  it('should exec if a fn as passed in place of fnList', () => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new ChangeLogDomain({
        ModelClass: ChangeLogModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)

      Migration.do('deploy', [], migration, 'Migration.do.1')
  })
  it('should log the operation after success', () => {
    class ChangeLogModel {
        constructor(values) {
          Object.assign(this, values)
        }
      }
      class ChangeLogDomain extends AggregationRoot {
      }
  
      const ChangeLogMockAggregator = new ChangeLogDomain({
        ModelClass: ChangeLogModel,
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
  
      const ChangeLogMockAggregator = new ChangeLogDomain({
        ModelClass: ChangeLogModel,
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
  
      const ChangeLogMockAggregator = new ChangeLogDomain({
        ModelClass: ChangeLogModel,
        schema,
        className: 'ChangeLog',
        ...config,
      })

      const migration = new Migration(ChangeLogMockAggregator, config)

      Migration.do('deploy', [], migration, 'Migration.do.1')
  })

  it('should create a unique label for the operation if it was not provided', () => {
  })
})

describe('Migration.do validations', () => {
    it('operation different from deploy and rollback', async (done) => {
        expect.assertions(3)
      class ChangeLogModel {
          constructor(values) {
            Object.assign(this, values)
          }
        }
        class ChangeLogDomain extends AggregationRoot {
        }
    
        const ChangeLogMockAggregator = new ChangeLogDomain({
          ModelClass: ChangeLogModel,
          schema,
          className: 'ChangeLog',
          ...config,
        })
  
        const migration = new Migration(ChangeLogMockAggregator, config)
        
        return Migration.do('notvalid', [], migration).then(() => {
          return done()
        }).catch((err) => {
            expect(err.message).toMatch('A validation error has being catch... operation not performed')
            expect(err.errors[0].message).toMatch('Not received a valid operation to perform')
            expect(err.errors[0].identifier).toMatch('1st argument, operation')
            
            return done()
        })
    })
  
    it('fnList different from array or function instance', async (done) => {
        expect.assertions(3)
      class ChangeLogModel {
          constructor(values) {
            Object.assign(this, values)
          }
        }
        class ChangeLogDomain extends AggregationRoot {
        }
    
        const ChangeLogMockAggregator = new ChangeLogDomain({
          ModelClass: ChangeLogModel,
          schema,
          className: 'ChangeLog',
          ...config,
        })
  
        const migration = new Migration(ChangeLogMockAggregator, config)  
        return Migration.do('deploy', 'notvalid', migration).then(() => {
            return done()
          })
          .catch((err) => {
            expect(err.message).toMatch('A validation error has being catch... operation not performed')
            expect(err.errors[0].message).toMatch('Not received a valid task to perform')
            expect(err.errors[0].identifier).toMatch('2nd argument, fnList')
            return done()
          })
        
    })
  
    it('migration different from a migration instance', async (done) => {
        expect.assertions(3)
      class ChangeLogModel {
          constructor(values) {
            Object.assign(this, values)
          }
        }
        class ChangeLogDomain extends AggregationRoot {
        }
    
        const ChangeLogMockAggregator = new ChangeLogDomain({
          ModelClass: ChangeLogModel,
          schema,
          className: 'ChangeLog',
          ...config,
        })
  
        const notmigration = {}
  
        return Migration.do('deploy', [], notmigration).then(() => {
            return done()
          }).catch((err) => {
            expect(err.message).toMatch('A validation error has being catch... operation not performed')
            expect(err.errors[0].message).toMatch('Not received a valid migration instance')
            expect(err.errors[0].identifier).toMatch('3rd argument, migration')
            return done()
        })
    })

    it('fnList item as not function', async (done) => {
        class ChangeLogModel {
            constructor(values) {
              Object.assign(this, values)
            }
          }
          class ChangeLogDomain extends AggregationRoot {
          }
      
          const ChangeLogMockAggregator = new ChangeLogDomain({
            ModelClass: ChangeLogModel,
            schema,
            className: 'ChangeLog',
            ...config,
          })
    
          const migration = new Migration(ChangeLogMockAggregator, config)
          return Migration.do('deploy', ['notvaliditem'], migration).then(() => {
            return done()
          }).catch((err) => {
            expect(err.message).toMatch('A validation error has being catch... operation not performed')
            expect(err.errors[0].message).toMatch('A Task inside the list was not a valid function')
            expect(err.errors[0].identifier).toMatch('2nd argument, fnList item in position 0 [zeroBasedIndex]')
            return done()
        })
    })
  })