export async function save() {
  const updated = await this.connection.update(this)
  return Object.assign(this, updated.get())
}
