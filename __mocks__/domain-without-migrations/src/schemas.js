const ChangeLogSchema = hasToBe => ({
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
      validator: hasToBe.string().valid('deploy', 'rollback').required()
    },
    duration: {
      type: 'Number',
      validator: hasToBe.number(),
    },
    errorMessage: {
      type: 'Any',
      validator: hasToBe.any(),
    },
    kind: {
      type: 'String',
      validator: hasToBe.string(),
    },
    status: {
      type: 'Number',
      validator: hasToBe.number().valid(1, 0),
    },
    label: {
      type: 'String',
      indexKeyConfigurations: {
        'label-completedAt-index': 'HASH'
      },
      validator: hasToBe.string()
    },
    completedAt: {
      type: 'String',
      keyType: 'RANGE',
      indexKeyConfigurations: {
        'label-completedAt-index': 'RANGE'
      },
      validator: hasToBe.string().required()
    },
})

module.exports = {
  ChangeLogSchema,
}