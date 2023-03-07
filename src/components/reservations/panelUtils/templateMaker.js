export const templateMaker = (cabins = []) => {
    const template = {}
    cabins.map(c => c.enabled && (template[c.id] = []))
    return template
}