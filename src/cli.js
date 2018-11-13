import cli from 'commander'
import Migration, { getMigrationsFiles } from './Migration'

cli
    .version('v0.1.0-beta.0', '-v, --version')
    .description('DynamodbORM command line interface')


cli
    .command('deploy')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-r, --region', 'Choose a region different from us-east-1')
    .option('-d, --domain', 'Name of domain for put up')
    .option('-l, --label', 'Label for operation')
    .action((cmd, { domain, region, force, label }) => {
        const functor = 'up'
        const migration = new Migration({ region }, {})
        const { Repository: ChangeLogRepository } = migration.ChangeLogAggregator
        const domainsMigrationListFiles = getMigrationsFiles(domain)
        const listFns = Object.keys(domainsMigrationListFiles).map(async (filename) => {
            const DomainAggregator = require(filename)
            const logs = await ChangeLogRepository.find({
                query: {
                    domain: filename
                },
                filter: {
                    type: 'Equals',
                    object: 1, // status.success
                    subject: 'status'
                }
            })
           
            return {
                DomainAggregator,
                domain: filename,
                logs,
                migrations: domainsMigrationListFiles[filename].map(filepath => {
                    const filename = filepath.split('migrations/')[1]
                    const migrationName = filename.slice(0, filename.length - 3)
                    return ({
                        filepath,
                        migrationName,
                    })
                }),
            }
        }).reduce((_fns, {
            DomainAggregator,
            domain,
            logs,
            migrations,
        }) => {
            const {
                migrationName: lastMigrationDeployed,
                operation: lastOperationDeployed,
            } = logs[0] || {}
            const getMigrationsToBeDeployed = (
                _migrations = [],
                index = 0,
            ) => {
                if (!logs.length) return migrations
                // TODO: find relation of deploy and rollback
                if (migrations[index].migrationName === lastMigrationDeployed) {
                    if (lastOperationDeployed === 'deploy') {
                        return _migrations
                    }
                    return [
                        ..._migrations,
                        migrations[index]
                    ]
                }
                const nextIterator = index + 1
                return getMigrationsToBeDeployed([
                    ..._migrations,
                    migrations[index]
                ], nextIterator)
            }
            const migrationsToBeDeployed = getMigrationsToBeDeployed()
            const filteredFns = migrationsToBeDeployed.map(({ migrationName, filepath }) => {
                const fn = require(filepath)[functor]
                return ({
                    fn,
                    migrationName,
                    domain,
                    DomainAggregator
            })
        })
            return [
                ..._fns,
                ...filteredFns,
            ]
        }, [])
        
        // applied to Migration
        Migration.do(cmd, listFns, migration, label)
    })

cli
    .command('Rollback')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-d, --domain', 'Name of domain for put down')
    .action()

cli
    .command('Add')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-d, --domain', 'Name of domain for put down')
    .action()

cli.parse(process.argv)