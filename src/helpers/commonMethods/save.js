 export async function save(options={}) {
  const now = (new Date()).toISOString()
  if (this.id === undefined) {
    this.createdAt = now
  }
  this.updatedAt = now
  const updated = await this.connection.update(this, options)
  Object.assign(this, updated.get())
  return this
}
