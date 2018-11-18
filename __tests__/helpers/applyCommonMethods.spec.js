import applyCommonMethods from '../../src/helpers/applyCommonMethods'

describe('applyCommonMethods in Helpers, applied into every class that represents a entity on the ORM', () => {
  it('should have present all commom methods', () => {
    class Foo {}
    applyCommonMethods(Foo)
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
  })

  it('should put a _ as prefix if the target class already use that method name', () => {
    class Foo {
      addItem(){}
      delete(){}
      get(){}
      getItem(){}
      removeItem(){}
      save(){}
      set(){}
      update(){}
      updateItem(){}
      validate(){}
    }
    applyCommonMethods(Foo)
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
      addItem(){}
      delete(){}
      get(){}
      getItem(){}
      removeItem(){}
      save(){}
    }
    applyCommonMethods(Foo)
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

    expect(foo).toHaveProperty('_addItem')
    expect(foo).toHaveProperty('_delete')
    expect(foo).toHaveProperty('_get')
    expect(foo).toHaveProperty('_getItem')
    expect(foo).toHaveProperty('_removeItem')
    expect(foo).toHaveProperty('_save')
  })
})
