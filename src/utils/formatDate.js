export const fancyDate = (date) => {
    return new Date(date.toString()).toLocaleDateString("es-Ar", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
}

export const formatDate = (date) => {
    const day = new Date(date).getUTCDate(),
        month = new Date(date).getUTCMonth() + 1,
        year = new Date(date).getUTCFullYear()

    return `${month}/${day}/${year}`
}

export const deformatDate = (date) => {
    //? 2023-02-23 yyyy-mm-dd
    const day = new Date(date).getUTCDate(),
        month = new Date(date).getUTCMonth() + 1,
        year = new Date(date).getUTCFullYear()

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}
