type EmissionsByStartYearAndCountry = {
    coal: number,
    oil: number,
    gas: number,
    flaring: number,
    cement: number,
    other: number,
    total: number,
    country: string,
    year: number
}[];


export default EmissionsByStartYearAndCountry;