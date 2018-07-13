import * as commons from './commonMethods'

const extractMethods = (methods, key) => ({ ...methods, [key]: commons[key] })
function applyCommonMethods(classDefinition) {
  return Object.assign(
    classDefinition.prototype,
    Object.keys(commons).reduce(extractMethods, {})
  )
}

export default applyCommonMethods
