#!/usr/bin/env node

const fs = require('fs')
const cli = require('commander')

const { Migration, getMigrationsFiles } = require('../build/Migration')

const ChangeLogAggregator = require('./changelog-domain')
const { deploy } = require('./deploy')
const { rollback } = require('./rollback')
const { add } = require('./add')
const packageName = JSON.parse(fs.readFileSync('package.json')).name

const actionDeploy = deploy.bind(
    null,
    process.cwd(),
    packageName,
    Migration,
    ChangeLogAggregator,
    getMigrationsFiles,
)

const actionRollback = rollback.bind(
    null,
    process.cwd(),
    packageName,
    Migration,
    ChangeLogAggregator,
    getMigrationsFiles,
)

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
    .action(add)

cli.parse(process.argv)

module.exports.cli
