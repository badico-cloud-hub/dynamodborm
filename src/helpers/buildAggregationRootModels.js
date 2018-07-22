function buildAggregationRootModels(
  embed,
  applyRootSchema,
  applyValueObjectSchema,
  applyCommonMethods,
  Joi,
  connection,
  {
    ModelClass,
    schema,
    tableName,
    className
  },
  objectValuesMaps = [],
) {
  const getJoischema = (mixedSchema, objValMaps) => Object.keys(mixedSchema).reduce(
    (jschema, key) => ({
      ...jschema,
      [key]: mixedSchema[key] instanceof Function ? mixedSchema[key](embed, function(){}, objValMaps[key]).validator : mixedSchema[key].validator
    }),
    {}
  )
  const filterOutValidator = obj => Object.keys(obj).reduce((props, key) => (
    key !== 'validator' ? { ...props, [key]: obj[key] } : props
  ), {})
  const getMapperSchema = mixedSchema => Object.keys(mixedSchema).reduce(
    (jschema, key) => ({
      ...jschema,
      [key]: mixedSchema[key] instanceof Function
        ? mixedSchema[key]
        : filterOutValidator(mixedSchema[key])
    }),
    {}
  )
  const valueObjectsClasses = objectValuesMaps.reduce((batch, map) => {
    const mixedSchema = map.schema(Joi)
    const mapSchema = getMapperSchema(mixedSchema)
    const joiSchema = getJoischema(mixedSchema, batch)

    applyValueObjectSchema(map.ModelClass, mapSchema, connection, Joi.validate, joiSchema)
    applyCommonMethods(map.ModelClass)
    return ({
      ...batch,
      [map.className]: map.ModelClass,
      [map.key]: joiSchema // map.schema(Joi)
    })
  }, {})

  const mixedRootSchema = schema(Joi)
  const mapRootSchema = getMapperSchema(mixedRootSchema)
  const rootJoischema = getJoischema(mixedRootSchema, valueObjectsClasses)
  const parsedSchema = (
    objectValuesMaps.length
      ? objectValuesMaps.reduce((intermediateSchema, objectValueMap) => ({
        ...intermediateSchema,
        [objectValueMap.key]: intermediateSchema[objectValueMap.key](
          embed,
          objectValueMap.ModelClass
        )
      }), mapRootSchema)
      : mapRootSchema
  )
  applyRootSchema(
    ModelClass,
    { schema: parsedSchema, tableName },
    connection,
    Joi.validate,
    rootJoischema
  )
  applyCommonMethods(ModelClass)
  return {
    Model: ModelClass,
    ...(className ? { [className]: ModelClass } : {}),
    ...valueObjectsClasses
  }
}

function buildAggregationRootModelsFactory({
  embed,
  applyRootSchema,
  applyValueObjectSchema,
  applyCommonMethods,
  Joi
}) {
  return buildAggregationRootModels.bind(
    null,
    embed,
    applyRootSchema,
    applyValueObjectSchema,
    applyCommonMethods,
    Joi
  )
}

export { buildAggregationRootModels }
export default buildAggregationRootModelsFactory
