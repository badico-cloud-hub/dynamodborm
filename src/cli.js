import cli from 'commander'

cli
    .version('v0.1.0-beta.0', '-v, --version')
    .description('DynamodbORM command line interface')


cli
    .command('Deploy')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-d, --domain', 'Name of domain for put up')
    .action()

cli
    .command('Rollback')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-d, --domain', 'Name of domain for put down')
    .action()

cli
    .command('Add')
    .option('-f, --force', 'Ignore the existence of actual instance')
    .option('-d, --domain', 'Name of domain for put down')
    .action()

cli.parse(process.argv)