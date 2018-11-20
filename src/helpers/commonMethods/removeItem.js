import { DomainError } from '../../DomainError'
import { throwIfIsInvalidList } from './listHelpers'

export function removeItem(itemKey, itemId) {
  // TODO: test for this case
  throwIfIsInvalidList(this[itemKey])
  let founded = false
  // // TODO: test for this case
  this[itemKey] = this[itemKey].filter(
    (item) => {
      if (item.id === itemId) founded = true
      return item.id !== itemId
    }
  )

  // TODO: test for this case
  if(!founded) throw new DomainError({
    error: new Error('The item searched was not found'),
    args: [itemKey, itemId],
    method: 'removeItem'
  }, 'NotFoundItem')
  
  return this
}
