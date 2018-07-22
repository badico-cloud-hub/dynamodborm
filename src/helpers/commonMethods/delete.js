export async function del() {
  this.connection.delete(this)
  return this
}
