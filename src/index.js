import Connection from './Connection'
import Repository from './Repository'
import parseAggregationRootModel, { parseFields, Model } from './Model'
import Migration from './Migration'
export { appendCustomMethods } from './helpers/appendCustomMethods'

class AggregationRoot {
  constructor(modelRoot, ...objectsValuesMaps) {
    this.connection = new Connection(modelRoot)
    parseAggregationRootModel(
      this.connection,
      this,
      modelRoot,
      objectsValuesMaps,
    )
    this.parseFields = parseFields(modelRoot.schema, ...objectsValuesMaps)
    this.Repository = new Repository(this.Model, this.connection)
  }
}

export {
 Model,
}
export default AggregationRoot
