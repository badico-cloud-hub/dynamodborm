export const ChangeLogSchema = hasToBe => ({
    domain: {
      type: 'String',
      keyType: 'HASH',
      validator: hasToBe.string().required(),
    },
    appliedBy: {
      type: 'String',
      validator: hasToBe.string(),
    },
    migrationName: {
      type: 'String',
      validator: hasToBe.string().required()
    },
    operation: {
      type: 'String',
      validator: hasToBe.string().valid('Deploy', 'Rollback').required()
    },
    label: {
      type: 'String',
      validator: hasToBe.string()
    },
    completedAt: {
      type: 'String',
      keyType: 'RANGE',
      indexKeyConfigurations: {
        'changeNumber-index': 'HASH'
      },
      validator: hasToBe.string().required()
    },
})
