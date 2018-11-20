import { DynamoDBORMError } from '../../DynamoDBORMError'

function validator(joi, values, schema, self) {
  return new Promise((resolve, reject) => {
    const { error } = joi(values, schema, { abortEarly: false })
    if (error) {
      const validationError = new DynamoDBORMError(
        {
          error,
          method: 'validate',
          args: [ joi, values, schema, self ],
          className: 'Model'
        },
        'ValidationError',
      )
      
      error.details.forEach(error => {
        const identifier = error.path.filter((p) => isNaN(p)).join('.') 
        return validationError.pushError(error, identifier)
      })
      return reject(validationError)
    }
    return resolve(self)
  })
}

export function validate() {
 return validator(
   this.validator,
   { ...this.get(), ...(this.merchantId ? { merchantId: this.merchantId } : {}) } ,
   this.joischema,
   this,
  )
}
