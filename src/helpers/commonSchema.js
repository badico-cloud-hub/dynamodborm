export const commonSchema = hasToBe => ({
  createdAt: {
    type: 'String',
    validator: hasToBe.string(),
    defaultProvider: () => (new Date()).toISOString()
  },
  updatedAt: {
    type: 'String',
    validator: hasToBe.string(),
    defaultProvider: () => (new Date()).toISOString()
  }
})
