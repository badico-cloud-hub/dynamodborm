export function appendCustomMethods(funcInst, methods) {
    Object.assign(
        funcInst.prototype || funcInst,
        methods
    )
    return undefined
}
