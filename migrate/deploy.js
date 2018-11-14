function deploy (label, { domain, region, force }) {
    const functor = 'up'
    const migration = new Migration({ region }, {})
    const { Repository: ChangeLogRepository } = migration.ChangeLogAggregator
    const domainsMigrationListFiles = getMigrationsFiles(domain)
    return Promise.all(Object.keys(domainsMigrationListFiles).map((filename) => {
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
}

module.exports = {
    deploy
}