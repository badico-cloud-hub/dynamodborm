import { Migration } from '../../src/Migration'
import { deploy } from '../../migrate/deploy'
jest.mock('../../src/Migration')
// comandDirPath, packageName, Migration, ChangeLogAggregator, getMigrationsFiles, label, { domain, region, force }
it('placeholder', () => {})
// describe('deploy (label) in a domain - migrations table clean, i.e. first migration', () => {
//     beforeEach(() => {
//         // Clear all instances and calls to constructor and all methods:
//         Migration.mockClear();
//       });
      
//     it('should run the all migrations', () => {

//     })

//     it('should migrate the migrations table', () => {

//     })
// })


// describe('deploy (label) in a domain - migrations table with 2 of 3 migrations file, i.e. a partial migration', () => {
//     it('should run the third migration', () => {

//     })

//     it('should not migrate the migrations table', () => {

//     })
// })

// describe('deploy (label) in a domain - migrations table with 3 of 3 migrations file, i.e. a completely migrated', () => {
//     it('shouldn\'t run any migration', () => {

//     })

//     it('should not migrate the migrations table', () => {

//     })
// })


// describe('deploy (label) in a api - migrations table clean, i.e. first migration', () => {
//     it('should run the all migrations of all domains', () => {

//     })

//     it('should migrate the migrations table', () => {

//     })
// })


// describe('deploy (label) in a api - migrations table with 2 of 3 migrations file of a domain, i.e. a partial migration', () => {
//     it('should run the third migration and the one migration for other domain', () => {

//     })

//     it('should not migrate the migrations table', () => {

//     })
// })

// describe('deploy (label) in a api - migrations table with 3 of 3 migrations file of one domain, i.e. a completely migrated domain and a not migrated other', () => {
//     it('shouldn\'t run any migration of one domain, but run for the other', () => {

//     })

//     it('should not migrate the migrations table', () => {

//     })
// })

// describe('deploy (label) in a api - migrations table with 3 of 3 migrations file of one domain, and 1 migration for other, i.e. a completely migrated', () => {
//     it('shouldn\'t run any migration of one domain, but run for the other', () => {

//     })

//     it('should not migrate the migrations table', () => {

//     })
// })