const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const cli = require('commander')
const { Migration, getMigrationsFiles } = require('../build/Migration')

function deploy (label, { domain, region, force }) {

    // return console.log(label, domain, region)
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
}

function rollback() {}

function add(migrationName, { kind }) {
    console.log('migration name: ', migrationName, 'kind: ', kind)
    
    // se pasta nao existir criar pasta
    if(!fs.existsSync(path.join('src', 'migrations'))) {
        mkdirp.sync(path.join('src', 'migrations'))
        // const r = fs.mkdirSync(path.join(__dirname, 'src', 'migrations'))
    }

    // carregar template
    const content = `
    // migration of kind: ${kind} TODO: add recomendations on template
    module.exports.up = function(Aggregator) {
       
        
    }

    module.exports.down = function(Aggregator) {
       
        
    }
    `
    // criar arquivo na pasta
    fs.writeFileSync(
        path.join(
            // __dirname,
            'src',
            'migrations',
            `${(new Date()).toISOString()}_${migrationName}.js`
        ),
        content,
        'utf8',
    )
}
 
cli
    .version('v0.1.0-beta.0', '-v, --version')
    .description('DynamodbORM command line interface')

cli
    .command('deploy <label>')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-r, --region [value]', 'Choose a region different from us-east-1')
    .option('-d, --domain [value]', 'Name of domain for put up')
    // .option('-l, --label', 'Label for operation')
    .action(deploy)

cli
    .command('rollback')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-d, --domain', 'Name of domain for put down')
    .action(rollback)

cli
    .command('add <migrationName>')
    .option('-k, --kind [value]', 'The Kind of the migration') // table, seed, schema
    .action(add)

cli.parse(process.argv)