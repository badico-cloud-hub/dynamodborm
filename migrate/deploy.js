const utils = require('util')
const container = require('@spark/services-container')
const { DynamoDBORMProvider } = require('../lib/provider')


function deploy(comandDirPath, _package, Migration, ChangeLogAggregator, getMigrationsFiles, label, { domain, region, force }) {
    const packageName = _package.name
    const functor = 'up'
    const migration = new Migration(ChangeLogAggregator, { region }, {})

    const { Repository: ChangeLogRepository } = migration.ChangeLogAggregator
    const domainsMigrationListFiles = getMigrationsFiles.bind({
        comandDirPath,
        _package,
     })(domain)
    console.log('DOMAIN MIGRATION FILES :::', utils.inspect(domainsMigrationListFiles))
    const { ChangeLog } = ChangeLogAggregator
    console.log('container', container)
    DynamoDBORMProvider(container)
    // self-migration
    return migration.createTable(ChangeLog).then(() => {
        return Promise.all(Object.keys(domainsMigrationListFiles).map((filename) => {
            const fileToRequire = filename === packageName ? '../../../../src/orm' : `${filename}/build`
            // require provider
            const domain = require(`${fileToRequire}`).default
            container.register(domain)
            const DomainAggregator = container[domain.DomainName]
            return ChangeLogRepository.find({
                query: {
                    domain: filename
                },
                filter: {
                    type: 'Equals',
                    object: 1, // status.success
                    subject: 'status'
                }
            }).then((logs) => {
                console.log(utils.inspect(logs))
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
            })

        })).then((resolveds) => {
            const listFns = resolveds.reduce((_fns, {
                DomainAggregator,
                domain,
                logs,
                migrations,
            }) => {
                const {
                    migrationName: lastMigrationDeployed,
                    operation: lastOperationDeployed,
                } = logs[logs.length - 1] || {}

                const logsOrdered = logs.slice().reverse()
                const getMigrationsToBeDeployed = (
                    _migrations = [],
                    index = 0,
                    logIndex = 0,
                ) => {
                    if (!logs.length) return migrations
                    // TODO: find relation of deploy and rollback
                    const reversedMigrations = migrations.slice().reverse();
                    if (reversedMigrations[index].migrationName === logsOrdered[logIndex].migrationName) {
                        if (logsOrdered[logIndex].operation === 'deploy') {
                            return _migrations.slice().reverse()
                        }
                        const nextIterator = index + 1
                        const nextLogIterator = logIndex + 1
                        if (reversedMigrations.length - 1 >= index
                        ) {
                            return [
                                ..._migrations,
                                reversedMigrations[index]
                            ].slice().reverse()
                        }
                        return getMigrationsToBeDeployed([
                            ..._migrations,
                            reversedMigrations[index]
                        ],
                            nextIterator,
                            nextLogIterator
                        )
                    }
                    const nextIterator = index + 1
                    return getMigrationsToBeDeployed([
                        ..._migrations,
                        reversedMigrations[index]
                    ], nextIterator, logIndex)
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
            console.log(utils.inspect(listFns))
            // applied to Migration
            if (listFns.length) {
               return Migration.do('deploy', listFns, migration, label)
            }

            console.log('there are no migrations to run')
        })
    })
}

module.exports = {  deploy }
