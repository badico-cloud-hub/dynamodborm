export function validate() {
  return this.validator(this.get(), this.joischema, { abortEarly: false })
}
