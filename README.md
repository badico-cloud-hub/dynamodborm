# dynamodborm

A DDD ORM make with dynamodb mapper js


## A simple Aggregation root

```javascript
import AggregationRoot, { Model } from '@spark/dynamodborm'

const config = {
  region: 'us-east-1',
  tableName: 'domains'
}

class MyDomainModel extends Model {
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
)

export const {
  Model, // a alias for the aggregator/root model
  Domain, // the aggregator/root model with the given name, on line 44
  Repository, // a Repository for retrieve operations
  parseFields, // a parser of fields of the root model
  connection, // a instance of connection with the dynamodb
} = aggregationRoot

```

*Creating*

```javascript
  const fields = parseFields({ foo: 'bar', baz: 'a item that will be ignored' })
  const domainInstance = new Domain(fields)
  try {
    await domainInstance.validate() // one of the methods that come with the model
  } catch (invalidData) {
    // deal with the validation errors 
  }

  try {
    await domainInstance.save() // this method create a item on dynamodb or update a item 
  } catch (err) {
   // deal with connection error
  }

```

*Retrieving*

```javascript
    let domainInstance
    try {
      domainInstance = await Repository.get({ id })
      // for now the library do not throw a error with not finded
      //  TODO: fix this in near future 
      if(!domainInstance) throw new Error('DomainInstance not founded')
    } catch (notFindedDomainInstance) {
        // deal with the error
    }

    // use the instance
    domainInstance.set('foo', 'another value')
    // set is the recomended way to mutate the domain data
    // TODO:  make throw a error if a key not mapped is injected on the instance

    try {
        await domainInstance.validate()
        await domainInstance.save() // this method create a item on dynamodb or update a item 
    } catch (err) {
        // deal with connection error
    }
```

*Extrating the values*

```javascript
    domainInstance.get()
    // will return a plain object with key-value pair and not a instance anymore

    domainInstance.get('key1', 'key2')
    // select the keys to be extracted

```

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