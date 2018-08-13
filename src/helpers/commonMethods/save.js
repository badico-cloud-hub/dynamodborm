export async function save(options={}) {
  const updated = await this.connection.update(this, options)
  return Object.assign(this, updated.get())
}
