import { DomainError } from '../../DomainError'
import { throwIfIsInvalidList } from './throwIfIsInvalidList'

export function getItem(itemKey, itemId) {
    throwIfIsInvalidList(this[itemKey])
    const founded = this[itemKey].find(({id}) => id === itemId)

    if(!founded) throw new DomainError({
        error: new Error('The item searched was not found'),
        args: [itemKey, Item],
        method: 'getItem'
    }, 'NotFoundItem')
    
    return founded
  }
