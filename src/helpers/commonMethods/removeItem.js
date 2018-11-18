import { DomainError } from "../../DomainError";

export function removeItem(itemKey, itemId) {
  if (this[itemKey] !== undefined && !(this[itemKey] instanceof Array)) {
    throw new DomainError({
      error: new Error('The item is not a list'),
      args: [itemKey, Item],
      method: 'updateItem'
    }, 'NotValidOperation')
  }
  let founded = false
  this[itemKey] = this[itemKey].filter(
    (item) => {
      if (item.id === itemId) founded = true
      return item.id !== itemId
    }
  )

  if(!founded) throw new DomainError({
    error: new Error('The item searched was not found'),
    args: [itemKey, Item],
    method: 'removeItem'
  }, 'NotFoundItem')
  
  return this
}
