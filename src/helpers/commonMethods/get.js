export function get(...keys) {
  const extractRawData = (raw, key) =>
    (key === (
      'connection' ||
      'validator' ||
      'joischema' ||
      'merchantId' ||
      'errors'
    )
      ? raw
      : ({ ...raw, [key]: this[key] }))

  if (keys.length > 1) {
    return keys.reduce(extractRawData, {})
  }
  if (keys.length > 0) {
    return this[keys[0]]
  }
  Object.keys(this).reduce(extractRawData, {})
  return this
}
