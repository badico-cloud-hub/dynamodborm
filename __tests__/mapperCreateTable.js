const { DataMapper } = require('@aws/dynamodb-data-mapper')
const Client = require('aws-sdk/clients/dynamodb')
const Aggregator = require('../migrate/changelog-domain')

const client = new Client({ region: 'us-east-1' })
const mapper = new DataMapper({ client })
const { Model } = Aggregator

mapper.ensureTableExists(Model,
    {
        readCapacityUnits: Model.readCapacity, 
        writeCapacityUnits: Model.writeCapacity,
        ...(Model.indexes && Model.indexes.length ? { indexOptions: Model.indexes.reduce((options, index) => ({
            ...options,
            [index.name]: {
                readCapacityUnits: index.readCapacity, 
                writeCapacityUnits: index.writeCapacity,
                projection: index.projection,
                type: index.type,

            }
        }),{})
     } : {})
    }).then(console.log).catch(console.error)
