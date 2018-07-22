export function updateItem(itemKey, Item) {
  this[itemKey] = this[itemKey].map(
    (item) => item.id === Item.id ? Item : item
  )
  
  return this
}
