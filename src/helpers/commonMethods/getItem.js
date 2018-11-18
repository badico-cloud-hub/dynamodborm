import { DomainError } from "../../DomainError";

export function getItem(itemKey, itemId) {
    if (this[itemKey] !== undefined && !(this[itemKey] instanceof Array)) {
        throw new DomainError({
          error: new Error('The item is not a list'),
          args: [itemKey, Item],
          method: 'updateItem'
        }, 'NotValidOperation')
    }

    const founded = this[itemKey].find(({id}) => id === itemId)

    if(!founded) throw new DomainError({
        error: new Error('The item searched was not found'),
        args: [itemKey, Item],
        method: 'getItem'
    }, 'NotFoundItem')
    
    return founded
  }
