export function appendCustomMethods(funcInst, custommethods) {
    const target = funcInst.prototype || funcInst
    const extractCustomMethods = (methods, key) => {
        if (target[key] === undefined) {
          return ({ ...methods, [key]: custommethods[key] })
        }
        return ({
            ...methods,
            [`_${key}`]: target[key],
            [key]: custommethods[key],
        })
    }

    Object.assign(
        target,
        Object.keys(custommethods).reduce(extractCustomMethods, {})
    )
    return undefined
}
