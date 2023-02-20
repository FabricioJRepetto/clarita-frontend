export const templateMaker = (cabins = []) => {
    const template = {}
    cabins.map(c => template[c.id] = [])
    return template
}