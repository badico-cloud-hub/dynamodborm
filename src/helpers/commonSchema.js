export const commonSchema = hasToBe => ({
  createdAt: {
    type: 'Number',
    validator: hasToBe.date().timestamp(),
    defaultProvider: () => new Date()
  },
  updatedAt: {
    type: 'Number',
    validator: hasToBe.date().timestamp(),
    defaultProvider: () => new Date()
  }
})
