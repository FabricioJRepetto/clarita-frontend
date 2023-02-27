export const fancyDate = (date, day = true, hour = false) => {
    //? ES string format
    if (!date) return '?'
    const opt = { year: "numeric", month: "long", day: 'numeric' }
    day && (opt.weekday = 'long')
    if (hour) {
        opt.hour = "numeric"
        opt.minute = "numeric"
        opt.timeZoneName = "short"
        opt.timeZone = 'America/Buenos_Aires'
    }
    return new Date(date.toString()).toLocaleDateString("es-Ar", opt)
}

export const correctDate = (d) => {
    //? REST OF THE WORLD DATE format dd-mm-yyyy
    if (!d) return '-'
    const date = new Date(d)

    return new Date(date).toLocaleDateString('es-Ar')
}

export const formatDate = (d) => {
    //? EN format mm-dd-yyyy
    if (!d) return '-'
    const date = new Date(d)

    const day = new Date(date).getUTCDate(),
        month = new Date(date).getUTCMonth() + 1,
        year = new Date(date).getUTCFullYear()

    return `${month}/${day}/${year}`
}

export const deformatDate = (d) => {
    if (!d) return '-'
    const date = new Date(d)

    //? 2023-02-23 yyyy-mm-dd
    const day = new Date(date).getUTCDate(),
        month = new Date(date).getUTCMonth() + 1,
        year = new Date(date).getUTCFullYear()

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}


export const dayName = (d) => {
    //? ES string day
    if (!d) return '-'
    const date = formatDate(d)

    return new Date(date).toLocaleDateString("es-Ar", { weekday: 'long' })
}

export const weekDate = (start, day) => {
    //? returns the date of any week day based on the date of the first day of the week
    const date = new Date(start)
    const newDate = date.setDate(date.getDate() + day)

    return new Date(newDate).toLocaleDateString('en')
}