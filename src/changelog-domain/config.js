export const region = 'us-east-1'
export const tableName = 'migrations'
export const readCapacity = process.env['MIGRATIONS_READ_CAPACITY'] || 5
export const writeCapacity = process.env['MIGRATIONS_WRITE_CAPACITY'] || 5
