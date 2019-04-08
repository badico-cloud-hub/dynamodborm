# dynamodborm

A DDD ORM make with dynamodb mapper js

## Fatures on 0.2.0
- cli with commands:
  - `deploy`, execute `up` script from migration files
  - `rollback`, execute `down` script from migration files
  - `add`, create a new migration file
- Migration class, extending Connection class with:
  - `createTable`
  - `dropTable`
- a `updatedAt` field that updated itself after every change, and a way for disabiliting it
- commom fields, `updatedAt` and `updatedAt`
- Model with a new method:
  - sync update => this
- Base methods of `Model` being able to being overhide on definiton of model, in this case the original method is writen as `_methodName`

## Features on 0.1.0

- There is a base `Model` for the root `class/entity`, and a constructor for each item of a List on the Model.
- The base `Model` brings the following commom methods:
  - sync set => this
  - sync get => Map
  - sync addItem => this
  - sync updateItem => this
  - sync removeItem => this
  - async validate => void
  - async save => Promise(this)
  - async delete => Promise(this)
- The `Repository` instance come with `find()`, `get()` and `query()` out of box, it uses the `connection` behind to return a instance of the base Model, with the above methods.
- The connection is a wrapper around the `dynamodb-data-mapper-js`, it has inside the mapper it-self and the dynamodb Client instance.
- There is a powerfull way of extend any module of the above components.


## Examples

- Simple aggregation root with no list inside.
- Simple aggregation root with a list inside.

## ROADMAP
- Schema validation to `JSONSchema`
- Schema on migration
- Migration of schemas:
    - data.v1 to data.v2
    - data.v2 to data.v2
- publish this version on npm
- a full documentation of operations
- a example of extensability, adding custom methods
- coments in the code
- application of the `versionAttribute` of `mapper`
- a commom fields, with a way for configuring it


## Dependencies OR Builded with:

- Dynamodb-data-mapper-js
- Joi
- aws-sdk
