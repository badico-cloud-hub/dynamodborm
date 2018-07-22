export function removeItem(itemKey, itemId) {
  this[itemKey] = this[itemKey].filter(
    (item) => item.id !== itemId
  )
  
  return this
}
