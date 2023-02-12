export const fancyDate = (date, day = true) => {
    //? ES string format
    const opt = { year: "numeric", month: "long", day: 'numeric' }
    day && (opt.weekday = 'long')
    return new Date(date.toString()).toLocaleDateString("es-Ar", opt)
}

export const correctDate = (date) => {
    //? REST OF THE WORLD DATE format dd-mm-yyyy
    if (!date || typeof date !== 'string') return '-'

    // const day = new Date(date).getUTCDate(),
    //     month = new Date(date).getUTCMonth() + 1,
    //     year = new Date(date).getUTCFullYear()

    // return `${day}/${month}/${year}`
    return new Date(date).toLocaleDateString('es-Ar')
}

export const formatDate = (date) => {
    //? EN format mm-dd-yyyy
    if (!date || typeof date !== 'string') return '-'

    const day = new Date(date).getUTCDate(),
        month = new Date(date).getUTCMonth() + 1,
        year = new Date(date).getUTCFullYear()

    return `${month}/${day}/${year}`
}

export const deformatDate = (date) => {
    if (!date || typeof date !== 'string') return '-'

    //? 2023-02-23 yyyy-mm-dd
    const day = new Date(date).getUTCDate(),
        month = new Date(date).getUTCMonth() + 1,
        year = new Date(date).getUTCFullYear()

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}
