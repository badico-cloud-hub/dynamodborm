export async function deleteItem() {
  return this.connection.delete(this)
}
