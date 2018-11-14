const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const cli = require('commander')
const ChangeLogAggregator = require('./changelog-domain')
const { deploy } = require('./deploy')
const { Migration, getMigrationsFiles } = require('../build/Migration')
const packageName = JSON.parse(fs.readFileSync('package.json')).name
const actionDeploy = deploy.bind(
    null,
    packageName,
    Migration,
    ChangeLogAggregator,
    getMigrationsFiles,
)

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
    .action(actionDeploy)

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