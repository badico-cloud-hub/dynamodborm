# dynamodborm

A DDD ORM make with dynamodb mapper js

## Features on 1.0.0

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

- publish this version on npm
- a full documentation of operations
- a example of extensability, adding custom methods
- coments in the code
- migration methods for the domains, `up` and `down`
- a commom fields, with a way for configuring it
- a `updatedAt` field that updated itself after every change, and a way for disabiliting it
- application of the `versionAttribute` of `mapper`

## Dependencies OR Builded with:

- Dynamodb-data-mapper-js
- Joi
- aws-sdk
