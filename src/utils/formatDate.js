export const fancyDate = (date) => {

    return new Date(date.toString()).toLocaleDateString("es-Ar", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
}

export const formatDate = (date) => {
    const day = new Date(date).getUTCDate(),
        month = new Date(date).getUTCMonth() + 1,
        year = new Date(date).getUTCFullYear()

    return `${month}/${day}/${year}`
}
