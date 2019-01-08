import { DomainError } from '../../DomainError'
import { throwIfIsInvalidList } from './listHelpers'

export function getItem(itemKey, itemId) {
    throwIfIsInvalidList(this[itemKey])
    try {
        const founded = this[itemKey].find(({id}) => id === itemId)
        if(!founded) throw new Error('The item searched was not found')
        return founded
    } catch(error) {
        throw new DomainError({
            error: error,
            args: [itemKey, Item],
            method: 'getItem'
        }, 'NotFoundItem')
    }
  }
