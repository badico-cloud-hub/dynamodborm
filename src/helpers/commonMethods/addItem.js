import { throwIfIsInvalidList } from './listHelpers'

export function addItem(itemKey, Item) {
    // TODO: test for this case
    throwIfIsInvalidList(this[itemKey])
    // TODO: add check for uniqueness
    const items = this[itemKey] || []
    this[itemKey] = [...items, Item] // dont't like this
    return this 
  }
