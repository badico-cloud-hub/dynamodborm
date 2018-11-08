## A Aggregation root with list item

```javascript
const config = {
  region: 'us-east-1',
  tableName: 'domains'
}

class MyDomainModel extends Model {
    // you could add custom methods here

}

class ListItemModel extends Model {
    // you could add custom methods here

}

const myDomainSchema = (hasToBe) => { // has to be is a Joi validator
  id: {
    type: 'String',
    keyType: 'RANGE',
    indexKeyConfigurations: {
      'id-index': 'HASH'
    },
    defaultProvider: v4,
    validator: hasToBe.string().guid()
  },
  createdAt: {
    type: 'String',
    keyType: 'HASH',
    defaultProvider: () => (new Date()).toISOString(),
    validator: hasToBe.string()

  },
  foo: {
    type: 'String',
    validator: hasToBe.string().required()
  }
  items:  (embed, embedClass, itemSchema) => ({
    type: 'List',// TODO: accept Map
    memberType: embed(embedClass),
    validator: hasToBe.array().items(hasToBe.object().keys(itemSchema))
  }),
}

const listItemSchema = hasToBe => { // has to be is a Joi validator
  id: {
    type: 'String',
    keyType: 'RANGE',
    validator: hasToBe.string().guid()
  },
  createdAt: {
    type: 'String',
    validator: hasToBe.string()

  },
  bar: {
    type: 'String',
    validator: hasToBe.string().required()

  }
}

const {config, tableName} = config
const aggregationRoot = new AggregationRoot(
  {
    ModelClass: MyDomainModel,
    tableName,
    region,
    className: 'Domain',
    schema: myDomainSchema
  },
  {
    ModelClass: ListItemModel,
    schema: listItemSchema,
    className: 'ListItem',
    key: 'items'
  })

export const {
  Model, // a alias for the aggregator/root model
  Domain, // the aggregator/root model with the given name, on line 44
  ListItem,
  Repository, // a Repository for retrieve operations
  parseFields, // a parser of fields of the root model
  connection, // a instance of connection with the dynamodb
} = aggregationRoot
```