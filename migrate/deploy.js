const utils = require('util')
const container = require('@spark/utils/lib/IoC').default
const {
    AggregationRoot,
    Model,
    DynamoDBORMError,
    DomainError,
    Migration,
} = require('../lib')

console.log('AggregationRoot', AggregationRoot)
function DynamoDBORMProvider(c) {
    c.service('AggregationRoot', () => AggregationRoot)
    c.service('Model', () => Model)
    c.service('DynamoDBORMError', () => DynamoDBORMError)
    c.service('DomainError', () => DomainError)
    c.service('Migration', () => Migration)
}
console.log('container???', container)
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
    DynamoDBORMProvider(container)
    console.log('container with services?', container)
    // self-migration
    return migration.createTable(ChangeLog).then(() => {
        return Promise.all(Object.keys(domainsMigrationListFiles).map((filename) => {
            console.log('REQUIRE :::', utils.inspect(filename))
            const fileToRequire = filename === packageName ? '../../../../build/index.js' : filename
            // require provider
            const provider = require(`${fileToRequire}/build/provider`).default
            console.log('provider?', provider)
            provider(container)
            console.log('domainname?', provider.DomainName)
            console.log('aggregator?', container[provider.DomainName])
            const DomainAggregator = container[provider.DomainName]
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

module.exports = {
    deploy
}