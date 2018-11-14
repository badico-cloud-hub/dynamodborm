const {
  appendCustomMethods,
  default: AggregationRoot,
} = require('../../build')
const { region, tableName } = require('./config')
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
