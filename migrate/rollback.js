const utils = require('util')
const container = require('@spark/utils/lib/IoC').default
const { DynamoDBORMProvider } = require('../lib/provider')

function rollback (comandDirPath,  _package, Migration, ChangeLogAggregator, getMigrationsFiles, label, { domain, region, force }) {
    const packageName = _package.name
    const functor = 'down'
    const migration = new Migration(ChangeLogAggregator, { region }, {})
    const { Repository: ChangeLogRepository } = migration.ChangeLogAggregator
    const domainsMigrationListFiles = getMigrationsFiles.bind({
        comandDirPath,
        _package,
    })(domain)
    DynamoDBORMProvider(container)
    
    return Promise.all(Object.keys(domainsMigrationListFiles).map((filename) => {
        const fileToRequire = filename === packageName ? '../../../../src/orm' : `${filename}/build`
        // require provider
        const provider = require(`${fileToRequire}/provider`).default
        provider(container)
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

            const getMigrationsToBeDeployed = (
                _migrations = [],
                index = 0,
            ) => {
                if (!logs.length) return []
                // se nao tem nda no log, quer dizer que não há rollback a ser feito
                
                // TODO: find relation of deploy and rollback
                if (migrations[index].migrationName === lastMigrationDeployed) {
                    if (lastOperationDeployed !== 'deploy') {
                        return _migrations.slice().reverse()
                    }
                    return [
                        ..._migrations,
                        migrations[index]
                    ].slice().reverse()
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
        console.log(utils.inspect(listFns))
        // applied to Migration
        if (listFns.length) {
           return Migration.do('rollback', listFns, migration, label)
        }
        console.log('there are no migrations to run')

    })
}

module.exports = {
    rollback
}
