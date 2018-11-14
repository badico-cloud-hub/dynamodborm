import AggregationRoot, { appendCustomMethods } from '../'
import { region, tableName } from './config'
import {
  ChangeLogModel,
} from './models'

import {
    ChangeLogSchema,
} from './schemas'


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


export {
  Model,
  ChangeLog,
  parseFields,
  connection,
  Repository,
}
export default aggregationRoot
