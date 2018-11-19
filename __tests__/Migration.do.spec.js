import AggregationRoot from '../src'
import util from 'util'
import {
    Migration,
} from '../src/Migration'


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

describe('Migration.do operator', () => {
  it('should exec one after other', async (done) => {
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
      const sequence = []
      const first = async () => sequence.push('first')
      const second = async () => sequence.push('second')
      const mockFn = fn => ({
          fn, 
          migrationName: 'mocked_migration',
          DomainAggregator: ChangeLogMockAggregator,
          kind: 'stup',
          domain: '@Spec/mock'
      })
      try {
       await migration.createTable(ChangeLogMockAggregator.Model)
       await Migration.do('deploy', [mockFn(first), mockFn(second)], migration).then(() => {
           expect(sequence).toHaveLength(2)
           expect(sequence[0]).toBe('first')
           expect(sequence[1]).toBe('second')
       })
       await migration.dropTable(ChangeLogMockAggregator.Model)
       return done()
      } catch (err) {
          console.log(util.inspect(err))
          return done()
      }
      
  },1000000)

  it('should promissify fnList item if the function is not async', async (done) => {
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

      const sequence = []
      const first = async () => sequence.push('first')
      const second = () => sequence.push('second')
      const mockFn = fn => ({
        fn, 
        migrationName: 'mocked_migration',
        DomainAggregator: ChangeLogMockAggregator,
        kind: 'stup',
        domain: '@Spec/mock'
    })
      try {
       await migration.createTable(ChangeLogMockAggregator.Model)
       await Migration.do('deploy', [mockFn(first), mockFn(second)], migration).then(() => {
           expect(sequence).toHaveLength(2)
           expect(sequence[0]).toBe('first')
           expect(sequence[1]).toBe('second')
       })
       await migration.dropTable(ChangeLogMockAggregator.Model)
       return done()
      } catch (err) {
          return done()
      }
  },1000000)

  it('should exec if a fn as passed in place of fnList', async (done) => {
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

      const sequence = []
      const _async = async () => sequence.push('async')
      const _sync = () => sequence.push('sync')
      const mockFn = fn => ({
        fn, 
        migrationName: 'mocked_migration',
        DomainAggregator: ChangeLogMockAggregator,
        kind: 'stup',
        domain: '@Spec/mock'
    })
      try {
       await migration.createTable(ChangeLogMockAggregator.Model)
       await Migration.do('deploy', mockFn(_async), migration)
       await Migration.do('deploy', mockFn(_sync), migration)

       expect(sequence).toHaveLength(2)
       expect(sequence[0]).toBe('async')
       expect(sequence[1]).toBe('sync')

       await migration.dropTable(ChangeLogMockAggregator.Model)
       return done()
      } catch (err) {
          return done()
      }
  },1000000)
  it('should log the operation after success', async(done) => {
      expect.assertions(1)
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

      const sequence = []
      const _async = async () => sequence.push('async')
      const _sync = () => sequence.push('sync')
      const mockFn = fn => ({
        fn, 
        migrationName: 'mocked_migration',
        DomainAggregator: ChangeLogMockAggregator,
        kind: 'stup',
        domain: '@Spec/mock'
      })
      try {
       await migration.dropTable(ChangeLogMockAggregator.Model)
       await migration.createTable(ChangeLogMockAggregator.Model)
       await Migration.do('deploy', [mockFn(_async), mockFn(_sync)], migration)
       await Migration.do('deploy', mockFn(_sync), migration)
       const { Repository } = ChangeLogMockAggregator
       const logs = await Repository.find()
       expect(logs.length).toBeGreaterThanOrEqual(3)
       await migration.dropTable(ChangeLogMockAggregator.Model)
       return done()
      } catch (err) {
          console.log(util.inspect(err))
          return done()
      }
  },1000000)

  it('should log the operation after error', async(done) => {
      expect.assertions(1)
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

     
      const sequence = []
      const _async = async () => sequence.push('async')
      const _sync = () => sequence.push('sync')
      const _error = () => Promise.reject(new Error('mock error'))
      const mockFn = fn => ({
        fn,
        migrationName: 'mocked_migration',
        DomainAggregator: ChangeLogMockAggregator,
        kind: 'stup',
        domain: '@Spec/mock'
      })
      try {
       await migration.dropTable(ChangeLogMockAggregator.Model)
       await migration.createTable(ChangeLogMockAggregator.Model)
       await Migration.do('deploy', [mockFn(_error)], migration)
       return done()
      } catch (err) {
            const { Repository } = ChangeLogMockAggregator
            const logs = await Repository.find()
            expect(logs).toHaveLength(1)
            await migration.dropTable(ChangeLogMockAggregator.Model)
          return done()
      }
  },1000000)

  it('should stop the operation after error', async(done) => {
      expect.assertions(2)
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
      const sequence = []
      const _async = async () => sequence.push('async')
      const _sync = () => sequence.push('sync')
      const _error = () => Promise.reject(new Error('mock error'))
      const mockFn = fn => ({
        fn,
        migrationName: 'mocked_migration',
        DomainAggregator: ChangeLogMockAggregator,
        kind: 'stup',
        domain: '@Spec/mock'
      })
      try {
       await migration.dropTable(ChangeLogMockAggregator.Model)
       await migration.createTable(ChangeLogMockAggregator.Model)
       await Migration.do('deploy', [mockFn(_async), mockFn(_error), mockFn(_sync)], migration)
       return done()
      } catch (err) {
            const { Repository } = ChangeLogMockAggregator
            const logs = await Repository.find()
            expect(logs).toHaveLength(2)
            expect(sequence).toHaveLength(1)
            await migration.dropTable(ChangeLogMockAggregator.Model)
          return done()
      }
  },1000000)

  it('should create a unique label for the operation if it was not provided', async(done) => {
    expect.assertions(5)
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
      const sequence = []
      const _async = async () => sequence.push('async')
      const mockFn = fn => ({
        fn,
        migrationName: 'mocked_migration',
        DomainAggregator: ChangeLogMockAggregator,
        kind: 'stup',
        domain: '@Spec/mock'
      })
      try {
       await migration.dropTable(ChangeLogMockAggregator.Model)
       await migration.createTable(ChangeLogMockAggregator.Model)
       await Migration.do('deploy', [mockFn(_async)], migration)
       await Migration.do('rollback', [mockFn(_async)], migration)
       const { Repository } = ChangeLogMockAggregator
       const logs = await Repository.find()
       expect(logs).toHaveLength(2)
       expect(logs[0]).toHaveProperty('label')
       expect(logs[0].label).toMatch('deploy.')
       expect(logs[1].label).toMatch('rollback.')

       const uniquenumberDeploy = logs[0].label.split('.')[1]
       const uniquenumberRollback = logs[1].label.split('.')[1]

       expect(uniquenumberDeploy).not.toBe(uniquenumberRollback)

       await migration.dropTable(ChangeLogMockAggregator.Model)
       return done()
      } catch (err) {
          return done()
      }
  },1000000)
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