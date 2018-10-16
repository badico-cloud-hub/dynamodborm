export function get(...keys) {
  const extractRawData = (raw, key) => {
   return (
    (key === 'connection' ||
    key === 'validator' ||
    key === 'joischema' ||
    key === 'merchantId' ||
    key === 'errors'
    )
    ? raw
    : ({ ...raw, [key]: this[key] }))
  }
    
  if (keys.length > 1) {
    return keys.reduce(extractRawData, {})
  }
  if (keys.length > 0) {
    return this[keys[0]]
  }
  return Object.keys(this).reduce(extractRawData, {})
}
