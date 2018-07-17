function path(keys, obj) {
  const reducer = (p, o) => p.reduce((root, key) => root && (root[key]), o)
  if (obj) return reducer(keys, obj)
  return objCurried => reducer(keys, objCurried)
}

function parseFields(Joi, rootSchema, ...objectValuesSchemas) {
  const mapedObjectValuesSchemas = objectValuesSchemas.reduce(
    (schemas, map) => ({
      ...schemas,
      [map.key]: map.schema(Joi)
    }),
    {},
  )
  const schema = Object.keys(mapedObjectValuesSchemas).reduce(
    (mergedSchema, key) => ({
      ...mergedSchema,
      [key]: mapedObjectValuesSchemas[key]
    }),
    rootSchema(Joi),
  )
  return (fields) => {
    const parseArrayItems = (values, ...keys) => {
      const parseItems = (parsedItems, field, index) => {
        const itemSchema = path([...keys], schema)
        if (typeof field === 'object') {
          return [
            ...parsedItems,
            (
              itemSchema
              && field instanceof Array
                ? parseArrayItems(field, ...keys) // TODO: Look to error on nested
                : parseObjFields(field, ...keys)
            )
          ]
        }
        return [
          ...parsedItems,
          (itemSchema && field)
        ]
      }
      return values.reduce(parseItems, [])
    }
    const parseObjFields = (obj, ...keys) => {
      const parseKeysField = (parsedFields, key) => {
        const fieldSchema = path([...keys, key], schema)
        const field = path([...keys, key], fields)
        if (typeof field === 'object') {
          return {
            ...parsedFields,
            ...(fieldSchema && { [key]:
              field instanceof Array
                ? parseArrayItems(field, ...keys, key)
                : parseObjFields(field, ...keys, key)
            })
          }
        }
        return {
          ...parsedFields,
          ...(fieldSchema && { [key]: obj[key] })
        }
      }
      return Object.keys(obj).reduce(parseKeysField, {})
    }
    return parseObjFields(fields)
  }
}

export function parseFieldsFactory(Joi) {
  return parseFields.bind(null, Joi)
}
