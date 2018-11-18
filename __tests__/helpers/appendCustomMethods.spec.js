import { appendCustomMethods } from '../../src/helpers/appendCustomMethods'
import applyCommonMethods from '../../src/helpers/applyCommonMethods'

describe('appendCustomMethods in Helpers, avaliable to apply custom functions as methods to every class that represents a entity on the ORM', () => {
  it('should have present all custom methods applyed', () => {
    class Foo {
    }

    const customMethod = {
      baz: function() {}
    }
    applyCommonMethods(Foo)
    appendCustomMethods(Foo, customMethod)
    const foo = new Foo()
    expect(foo).toHaveProperty('addItem')
    expect(foo).toHaveProperty('delete')
    expect(foo).toHaveProperty('get')
    expect(foo).toHaveProperty('getItem')
    expect(foo).toHaveProperty('removeItem')
    expect(foo).toHaveProperty('save')
    expect(foo).toHaveProperty('set')
    expect(foo).toHaveProperty('update')
    expect(foo).toHaveProperty('updateItem')
    expect(foo).toHaveProperty('validate')

    expect(foo).toHaveProperty('baz')
  })

  it('should put a _ prefix in the overhide version of the method', () => {
    class Foo {
    }
    applyCommonMethods(Foo)

    const customMethod = {
      baz: function() {},
      addItem: function() {},
      delete: function() {},
      get: function() {},
      getItem: function() {},
      removeItem: function() {},
      save: function() {},
      set: function() {},
      update: function() {},
      updateItem: function() {},
      validate: function() {},
    }
    appendCustomMethods(Foo, customMethod)
    const foo = new Foo()
    expect(foo).toHaveProperty('addItem')
    expect(foo).toHaveProperty('delete')
    expect(foo).toHaveProperty('get')
    expect(foo).toHaveProperty('getItem')
    expect(foo).toHaveProperty('removeItem')
    expect(foo).toHaveProperty('save')
    expect(foo).toHaveProperty('set')
    expect(foo).toHaveProperty('update')
    expect(foo).toHaveProperty('updateItem')
    expect(foo).toHaveProperty('validate')

    expect(foo).toHaveProperty('baz')
    expect(foo).toHaveProperty('_addItem')
    expect(foo).toHaveProperty('_delete')
    expect(foo).toHaveProperty('_get')
    expect(foo).toHaveProperty('_getItem')
    expect(foo).toHaveProperty('_removeItem')
    expect(foo).toHaveProperty('_save')
    expect(foo).toHaveProperty('_set')
    expect(foo).toHaveProperty('_update')
    expect(foo).toHaveProperty('_updateItem')
    expect(foo).toHaveProperty('_validate')
  })

  it('should the prefix decision be individual for each method', () => {
    class Foo {
    }
    applyCommonMethods(Foo)


    const customMethod = {
      baz: function() {},
      addItem: function() {},
      delete: function() {},
      get: function() {},
      getItem: function() {},
      removeItem: function() {},
      save: function() {},
    }
    appendCustomMethods(Foo, customMethod)
    const foo = new Foo()
    expect(foo).toHaveProperty('addItem')
    expect(foo).toHaveProperty('delete')
    expect(foo).toHaveProperty('get')
    expect(foo).toHaveProperty('getItem')
    expect(foo).toHaveProperty('removeItem')
    expect(foo).toHaveProperty('save')

    expect(foo).toHaveProperty('set')
    expect(foo).toHaveProperty('update')
    expect(foo).toHaveProperty('updateItem')
    expect(foo).toHaveProperty('validate')

    expect(foo).toHaveProperty('baz')
    expect(foo).toHaveProperty('_addItem')
    expect(foo).toHaveProperty('_delete')
    expect(foo).toHaveProperty('_get')
    expect(foo).toHaveProperty('_getItem')
    expect(foo).toHaveProperty('_removeItem')
    expect(foo).toHaveProperty('_save')
  })
})
