import { DomainError } from '../../DomainError'
import { throwIfIsInvalidList } from './throwIfIsInvalidList'

export function updateItem(itemKey, Item) {
  // TODO: test for this case
  throwIfIsInvalidList(this[itemKey])
  let found = false
  // TODO: test for this case
  this[itemKey] = this[itemKey].map(
    (item) => item.id === Item.id ? (found = true, Item) : item
  )

  // TODO: test for this case
  if(!found) throw new DomainError({
    error: new Error('The item searched was not found'),
    args: [itemKey, Item],
    method: 'updateItem'
  }, 'NotFoundItem')

  return this
}
