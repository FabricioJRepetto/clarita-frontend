import countries from "@/countryList";

export const country = (code) => {
    return Object.entries(countries).find(key => key[0] === code)[1]
}