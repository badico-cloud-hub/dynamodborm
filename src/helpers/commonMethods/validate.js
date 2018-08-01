function validator(joi, values, schema, self) {
  return new Promise((resolve, reject) => {
    const { error } = joi(values, schema, { abortEarly: false })
    if (error) {
      return reject(error)
    }
    return resolve(self)
  })
}

export function validate() {
 return validator(
   this.validator,
   this.get(),
   this.joischema,
   this,
  )
}
