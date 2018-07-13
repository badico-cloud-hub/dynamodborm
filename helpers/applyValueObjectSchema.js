function applyObjectValueSchema(
  DynamoDbSchema,
  classDefinition,
  schema,
  connection,
  validator,
  joischema
) {
  Object.assign(classDefinition.prototype, {
    connection,
    validator,
    joischema
  })
  return Object.defineProperties(classDefinition.prototype, {
    [DynamoDbSchema]: {
      value: schema
    },
    connection,
    validator,
    joischema
  })
}

function applyObjectValueSchemaFactory({
  DynamoDbSchema
}) {
  return applyObjectValueSchema.bind(null, DynamoDbSchema)
}
export { applyObjectValueSchema }
export default applyObjectValueSchemaFactory

