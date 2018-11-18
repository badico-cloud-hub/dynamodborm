import { appendCustomMethods } from '../../src/helpers/appendCustomMethods'

describe('appendCustomMethods in Helpers, avaliable to apply custom functions as methods to every class that represents a entity on the ORM', () => {
  it('should have present all custom methods applyed', () => {
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

  it('should put a _ prefix in the overhide version of the method', () => {
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

  it('should the prefix decision be individual for each method', () => {
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
})
