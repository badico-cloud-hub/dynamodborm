module.exports = {
    region: 'us-east-1',
    tableName: 'migrations',
    readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
    writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
    indexes: [
        {
            name: 'label-completedAt-index',
            readCapacity: process.env['MIGRATIONS_READ_CAPACITY'] || 5,
            writeCapacity: process.env['MIGRATIONS_WRITE_CAPACITY'] || 5,
            type: 'global',
            projection: 'all'
        }
    ]
}

