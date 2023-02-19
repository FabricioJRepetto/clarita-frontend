export const flag = (code) => {
    // https://flagcdn.com/${code}.svg //:SVG
    // https://flagcdn.com/16x12/${code}.webp //: waving
    // https://flagcdn.com/h20/${code}.webp //: h fixed
    // https://flagcdn.com/w20/${code}.webp //: w fixed

    return `https://flagcdn.com/${code}.svg`
}