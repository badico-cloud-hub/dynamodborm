export const throwIfIsInvalidList = item => {
    if (item !== undefined && !(item instanceof Array)) {
        throw new DomainError({
            error: new Error('The item is not a list'),
            args: [itemKey, Item],
            method: 'updateItem'
        }, 'NotValidOperation')
    }
}
