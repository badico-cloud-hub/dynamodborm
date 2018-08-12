export function appendCustomMethods(funcInst, methods) {
    Object.assign(
        funcInst.prototype,
        methods
    )
    return undefined
}