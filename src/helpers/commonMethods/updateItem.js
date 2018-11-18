import { DomainError } from "../../DomainError";

export function updateItem(itemKey, Item) {
  if (this[itemKey] !== undefined && !(this[itemKey] instanceof Array)) {
    throw new DomainError({
      error: new Error('The item is not a list'),
      args: [itemKey, Item],
      method: 'updateItem'
    }, 'NotValidOperation')
  }
  
  let found = false
  this[itemKey] = this[itemKey].map(
    (item) => item.id === Item.id ? (found = true, Item) : item
  )
  if(!found) throw new DomainError({
    error: new Error('The item searched was not found'),
    args: [itemKey, Item],
    method: 'updateItem'
  }, 'NotFoundItem')

  return this
}
