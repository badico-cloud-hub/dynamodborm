function applyAgregationRootSchema(
  DynamoDbTable,
  DynamoDbSchema,
  classDefinition,
  { schema, tableName },
  connection,
  validator,
  joischema
) {
  console.log('TABLE NAME Being applyed', tableName)
  Object.assign(classDefinition.prototype, {
    connection,
    validator,
    joischema
  })
  return Object.defineProperties(classDefinition.prototype, {
    [DynamoDbTable]: {
      value: tableName
    },
    [DynamoDbSchema]: {
      value: schema
    }
  })
}

function applyAgregationRootSchemaFactory({
  DynamoDbTable,
  DynamoDbSchema
}) {
  return applyAgregationRootSchema.bind(null, DynamoDbTable, DynamoDbSchema)
}
export { applyAgregationRootSchema }
export default applyAgregationRootSchemaFactory
