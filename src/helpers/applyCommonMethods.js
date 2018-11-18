import * as commons from './commonMethods'

function applyCommonMethods(classDefinition) {
  const extractMethods = (methods, key) => {
    if (classDefinition.prototype[key] === undefined) {
      return ({ ...methods, [key]: commons[key] })
    }
    return ({ ...methods, [`_${key}`]: commons[key] })
  }
  return Object.assign(
    classDefinition.prototype,
    Object.keys(commons).reduce(extractMethods, {})
  )
}

export default applyCommonMethods
