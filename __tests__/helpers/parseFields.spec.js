import Joi from 'joi'
import { parseFieldsFactory } from '../../src/helpers/parseFields'

jest.mock('joi')
const parseFields = parseFieldsFactory(Joi)
describe('parseFields, a function to retrieve just the fields based on our schema', () => {
  it('should respond with a empty object if no intended keys was sended', () => {
    const schema = () => ({
      name: {
        type: 'String'
      }
    })

    const data = {
      foo: 'a foo data'
    }

    const retrievedData = parseFields(schema)(data)
    expect(Object.keys(retrievedData)).toHaveLength(0)
  })

  it('should respond with a object with intended key as in a simple schema', () => {
    const schema = () => ({
      name: {
        type: 'String'
      }
    })

    const data = {
      foo: 'a foo data',
      name: 'a foo name'
    }

    const retrievedData = parseFields(schema)(data)
    expect(Object.keys(retrievedData)).toHaveLength(1)
    expect(retrievedData).toHaveProperty('name', data.name)
  })

  it('should respond with a object with intended key as in schema', () => {
    const root = () => ({
      name: {
        type: 'String'
      },
      email: {
        type: 'String'
        // validator: hasToBe.string().email() // .required()
      },
      foo: (embed, Class) => ({
        type: 'Collection',
        menberType: embed(Class)
      })
    })

    const objectValue = {
      schema: () => ({
        bar: {
          type: 'Name'
        }
      }),
      key: 'foo'
    }

    const data = {
      foo: {
        bar: 1,
        baz: 'a baz data'
      },
      name: 'a foo name',
      email: 'teste'
    }

    const retrievedData = parseFields(root, objectValue)(data)
    expect(Object.keys(retrievedData)).toHaveLength(3)
    expect(retrievedData).toHaveProperty('name', data.name)
    expect(retrievedData.foo).toHaveProperty('bar', data.foo.bar)
    expect(retrievedData.foo).not.toHaveProperty('baz')
  })

  it('should respond with a empty object even with data been complex and it keys not been present on schema', () => {
    const root = () => ({
      name: {
        type: 'String'
      },
      foo: (embed, Class) => ({
        type: 'Collection',
        menberType: embed(Class)
      })
    })

    const objectValue = {
      schema: () => ({
        bar: {
          type: 'String'
        }
      }),
      key: 'foo'
    }

    const data = {
      foo1: {
        bar: 1,
        baz: 'a baz data'
      },
      name1: 'a foo name'
    }

    const retrievedData = parseFields(root, objectValue)(data)
    expect(Object.keys(retrievedData)).toHaveLength(0)
  })

  it.only('should respond with a list when a list is sended', () => {
    const root = hasToBe => ({
      name: {
        type: 'String'
      },
      list: (embed, Class, itemSchema) => ({
        type: 'List',
        menberType: embed(Class),
        validator: hasToBe.array(itemSchema)
      })
    })

    const objectValue = {
      schema: () => ({
        bar: {
          type: 'String'
        }
      }),
      key: 'list'
    }

    const data = {
      list: [1,2,1],
      name: 'a foo name'
    }
    const retrievedData = parseFields(root, objectValue)(data)
    console.log('list', retrievedData.list)
    expect(Object.keys(retrievedData)).toHaveLength(2)
    expect(retrievedData.list).toHaveLength(3)
  })
})
