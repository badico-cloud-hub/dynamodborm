import { DomainError } from "../../DomainError"
import { throwIfIsInvalidList } from './throwIfIsInvalidList'

export function removeItem(itemKey, itemId) {
  throwIfIsInvalidList(this[itemKey])
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
