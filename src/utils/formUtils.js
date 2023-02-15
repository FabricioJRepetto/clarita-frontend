import { deformatDate, formatDate } from "./formatDate"

export const emailRe = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)

// Load data for edition
export const loadData = (data) => {
    const aux = Object.entries(data)
    aux.forEach(e => {
        const input = document.getElementById(e[0]),
            value = e[1];
        if (input && value !== '-') input.value = value
    })
}

export const setOUT = (checkin, nights) => {
    //? IN + N = OUT
    const N = Number.parseInt(nights),
        date = new Date(formatDate(checkin)),
        newDate = date.setDate(date.getUTCDate() + N),
        finalDate = deformatDate(new Date(newDate).toLocaleDateString('en'))

    return finalDate
}

export const setNIGHTS = (checkin, checkout) => {
    //: IN - OUT = N
    const dateIn = new Date(formatDate(checkin)),
        dateOut = new Date(formatDate(checkout)),
        N = (dateOut - dateIn) / 1000 / 60 / 60 / 24

    return N
}

export const setIN = (checkout, nights) => {
    //* OUT - N = IN
    const N = Number.parseInt(nights),
        date = new Date(formatDate(checkout)),
        newDate = date.setDate(date.getUTCDate() - N),
        finalDate = deformatDate(new Date(newDate).toLocaleDateString('en'))

    return finalDate
}

export const fillDates = (e) => {
    e.preventDefault()
    const checkin = document.getElementById('checkin'),
        checkout = document.getElementById('checkout'),
        nights = document.getElementById('nights'),
        id = e.target.id

    switch (id) {
        case 'checkin':
            if (checkin.value) {
                if (nights.value && !checkout.value) {
                    //? new value for "checkout" input (checkin + nights)
                    checkout.value = setOUT(checkin.value, nights.value)
                } else if (checkout.value) {
                    //: new value for "nights" input (checkout - checkin)
                    nights.value = setNIGHTS(checkin.value, checkout.value)
                }
            }
            break;

        case 'checkout':
            if (checkout.value) {
                if (nights.value && !checkin.value) {
                    //* new value for "checkin" input (checkout - nights)
                    checkin.value = setIN(checkout.value, nights.value)
                } else if (checkin.value) {
                    //: new value for "nights" input (checkout - checkin)
                    nights.value = setNIGHTS(checkin.value, checkout.value)
                }
            }
            break;

        default:
            if (checkout.value && !checkin.value) {
                //* new value for "checkin" input (checkout - nights)
                checkin.value = setIN(checkout.value, nights.value)
            } else if (checkin.value && !checkout.value) {
                //? new value for "checkout" input (checkin + nights)
                checkout.value = setOUT(checkin.value, nights.value)
            }
            break;
    }
}

export const doDatesOverlap = (a1, a2, b1, b2) => {
    const a = new Date(a1),
        b = new Date(a2),
        x = new Date(b1),
        y = new Date(b2)

    if ((x >= a && x < b) || (x < a && y > a))
        return true
    else
        return false
}

//: TODO: replantear el checkeo de fechas, quizas sea mejor hacerlo en el back
// Looks for available cabins
export const datesValidator = (cabins, setAvCabins, setErrors) => {
    const IN = document.getElementById('checkin').value,
        OUT = document.getElementById('checkout').value

    if (!IN || !OUT) return null

    const dateA = formatDate(IN),
        dateB = formatDate(OUT),
        select = document.getElementById('cabin')

    let avCabins = []

    cabins.forEach(c => {
        //look for a reservation that overlaps with form dates
        let flag = c.reservations.find(r => doDatesOverlap(r.in, r.out, dateA, dateB))
        // if there is none (flag == false) save cabin for render
        !flag && avCabins.push({ id: c.id, name: c.name })
    })

    if (!!avCabins.length) {
        // remove posible error
        setErrors(errors => {
            let aux = { ...errors }
            delete aux.checkin
            return aux
        })
        // enable select input
        select.disabled = false
        // set new cabin list for render
        setAvCabins(() => avCabins)
    } else {
        // disable select input
        select.disabled = true
        select.value = false
        // set error
        setErrors(errors => ({
            ...errors,
            checkin: 'No hay cabañas disponibles para estas fechas'
        }))
    }
}

export const numberToCurrency = (num) => {
    // format number XXXXXXX to X.XXX.XXX
    let n = String(num).replace('$', '').replace('.', '')
    if (n.length === 0) return ''
    return '$' + n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}