const utils = require('util')

function deploy(comandDirPath, packageName, Migration, ChangeLogAggregator, getMigrationsFiles, label, { domain, region, force }) {
    const functor = 'up'
    const migration = new Migration(ChangeLogAggregator, { region }, {})

    const { Repository: ChangeLogRepository } = migration.ChangeLogAggregator
    const domainsMigrationListFiles = getMigrationsFiles.bind({
        comandDirPath,
        _package: JSON.parse(fs.readFileSync(path.join(comandDirPath, 'package.json'))),
     }, domain)
    console.log('DOMAIN MIGRATION FILES :::', utils.inspect(domainsMigrationListFiles))
    const { ChangeLog } = ChangeLogAggregator
    // self-migration
    return migration.createTable(ChangeLog).then(() => {
        return Promise.all(Object.keys(domainsMigrationListFiles).map((filename) => {
            console.log('REQUIRE :::', utils.inspect(filename))
            const fileToRequire = filename === packageName ? '../../../../build/index.js' : filename

            const DomainAggregator = require(fileToRequire)
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
                Migration.do('deploy', listFns, migration, label)
            }

            console.log('there are no migrations to run')
        })
    })
}

module.exports = {
    deploy
}