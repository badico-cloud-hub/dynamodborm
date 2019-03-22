import { DynamoDBORMError } from '../../DynamoDBORMError'

function validator(joi, values, schema, self) {
  return new Promise((resolve, reject) => {
    const {error} = joi(values, schema, { abortEarly: false }, )
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
      
     const errors =  error.details.map(e => {
        console.log('ERROR & PATH', e)
        const identifier = e.path.filter((p) => isNaN(p)).join('.') 
        const { message } = e
        return new DynamoDBORMError({
          method: 'validate',
          args: [ joi, values, schema, self ],
          className: 'Model'
        }, identifier, message)
      })
      return reject(DynamoDBORMError.fromArray(errors, 'ValidationError'))
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
