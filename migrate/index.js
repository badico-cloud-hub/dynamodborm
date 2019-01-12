#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const cli = require('commander')
var exec = require('child_process').exec

const { Migration, getMigrationsFiles, findDomainDeps } = require('../lib/Migration')

const ChangeLogAggregator = require('./changelog-domain')
const { deploy } = require('./deploy')
const { rollback } = require('./rollback')
const { add } = require('./add')
const _package = JSON.parse(fs.readFileSync('package.json'))
const packageName = _package.name
const commandDirPath = process.cwd()
const actionDeploy = deploy.bind(
    null,
    commandDirPath,
    _package,
    Migration,
    ChangeLogAggregator,
    getMigrationsFiles,
)

const actionRollback = rollback.bind(
    null,
    commandDirPath,
    _package,
    Migration,
    ChangeLogAggregator,
    getMigrationsFiles,
)

const actionAdd = add.bind({ commandDirPath }, fs, path, mkdirp)
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
    .command('rollback  <label>')
    .option('-r, --region [value]', 'Choose a region different from us-east-1')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-d, --domain [value]', 'Name of domain for put down')
    .action(actionRollback)

cli
    .command('add <migrationName>')
    .option('-k, --kind [value]', 'The Kind of the migration') // table, seed, schema
    .action(actionAdd)

cli
    .command('build')
    .action()

cli
    .command('install')
    .action(() => {
        const domains = findDomainDeps(_package)
        console.log('Starting the instalation of domain')
        return Promise.all(
            domains
                .map(({domain}) => {
                    const pathtodomain = path.join('node_modules', '@spark', domain)
                    return new Promise((resolve, reject) => {
                        exec(`npm install --prefix ${pathtodomain}`, function(error, stdout, stderr){
                            if (error) {
                                return reject(error, stderr)
                            }
                            return resolve(stdout)
                        });
                    })
                })
        ).catch(console.error)
        .then(() => console.log('instalation finished'))
    })
cli.parse(process.argv)

module.exports.cli
