export const getDay = (day, data) => {
    const date = Object.keys(data).find(k => new Date(k).getDay() === day)
    return {
        day: data[date],
        date
    }
}