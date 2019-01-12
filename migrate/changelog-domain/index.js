const {
  appendCustomMethods,
  default: AggregationRoot,
} = require('../../lib')
const {
  region,
  tableName,
  readCapacity,
  writeCapacity,
  indexes,
} = require('./config')
const {
  ChangeLogModel,
} = require('./models')

const {
    ChangeLogSchema,
} = require('./schemas')


const aggregationRoot = new AggregationRoot(
  {
    ModelClass: ChangeLogModel,
    tableName,
    region,
    readCapacity,
    writeCapacity,
    indexes,
    className: 'ChangeLog',
    schema: ChangeLogSchema
  },
)


const {
  Model,
  ChangeLog,
  parseFields,
  connection,
  Repository
} = aggregationRoot


module.exports = {
  Model,
  ChangeLog,
  parseFields,
  connection,
  Repository,
}
