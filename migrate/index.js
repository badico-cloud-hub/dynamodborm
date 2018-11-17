#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const cli = require('commander')

const { Migration, getMigrationsFiles } = require('../build/Migration')

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

cli.parse(process.argv)

module.exports.cli
