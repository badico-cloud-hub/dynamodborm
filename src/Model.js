import {
  DynamoDbSchema,
  DynamoDbTable,
  embed
} from '@aws/dynamodb-data-mapper'
import Joi from 'joi'
import applyValueObjectSchemaFactory from './helpers/applyValueObjectSchema'
import applySchemaFactory from './helpers/applyAggregationRootSchema'
import applyCommonMethods from './helpers/applyCommonMethods'
import buildAggregationRootModelsFactory from './helpers/buildAggregationRootModels'
import { parseFieldsFactory } from './helpers/parseFields'

const applyRootSchema = applySchemaFactory({ DynamoDbSchema, DynamoDbTable })
const applyValueObjectSchema = applyValueObjectSchemaFactory({ DynamoDbSchema })

const buildAgregationRootModel = buildAggregationRootModelsFactory({
  embed,
  applyRootSchema,
  applyValueObjectSchema,
  applyCommonMethods,
  Joi
})
const parseFields = parseFieldsFactory(Joi)

function AgregationRootModel(
  connection,
  root,
  rootModel,
  objectsValueMaps
) {
  return Object.assign(
    root,
    buildAgregationRootModel(connection, rootModel, objectsValueMaps)
  )
}

class Model {
  constructor(values) {
    Object.assign(this, values)
  }
}
export { Model, parseFields }
export default AgregationRootModel
