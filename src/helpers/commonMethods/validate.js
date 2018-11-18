import { DomainError } from '../../DomainError'

function validator(joi, values, schema, self) {
  return new Promise((resolve, reject) => {
    const { error } = joi(values, schema, { abortEarly: false })
    if (error) {
      return reject(
        new DomainError({
            error,
            method: 'validate',
            args: [ joi, values, schema, self ],
            details:  error.details.map(e => ({
              message: e.message,
              identifier: e.path.filter((p) => isNaN(p)).join('.')
          }))
  
          },
          'ValidationError',
        )
      )
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
