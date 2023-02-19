import { editApi, postApi } from "@/services/api"
import { deformatDate, formatDate } from "./formatDate"
import { setNIGHTS } from "./formUtils"

export const validateReservErrors = (values, client) => {
    let errors = {}

    // check client input
    if (client && values.client === '-') errors.client = 'Campo requerido'

    if (values.checkin === '-') errors.checkin = 'Campo requerido'

    if (values.checkout === '-') errors.checkout = 'Campo requerido'

    //* TODO: alertar que el checkin es anterior a hoy

    if (values.nights === '-') errors.nights = 'Campo requerido'

    if (parseInt(values.nights) !== setNIGHTS(formatDate(values.checkin), formatDate(values.checkout))) errors.nights = 'La cantidad de noches no concuerda con las fechas'

    if (new Date(values.checkin) > new Date(values.checkout)) errors.checkin = 'El checkin no puede ser posterior al checkout'

    if (values.persons === '-') errors.persons = 'Campo requerido'

    if (values.cabin === '-') errors.cabin = 'Campo requerido'

    if (values.paymentType === '-') errors.paymentType = 'Campo requerido'

    if (values.currency === '-') errors.currency = 'Campo requerido'

    if (values.paymentType === 'Tarjeta de crédito' && values.fees === '-') errors.fees = 'Campo requerido'

    if (values.amount === '-') errors.amount = 'Campo requerido'

    if (values.paymentStatus === 'false' && values.percentage === '-') errors.percentage = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    }

    return false
}

export const validateValues = (e) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // input validator
    const errors = validateReservErrors(values)
    if (errors) return { errors }

    // change dates to correct format
    values.checkin = formatDate(values.checkin)
    values.checkout = formatDate(values.checkout)
    // change currency to number
    values.amount = parseInt(values.amount.replace(/\D/g, ""))
    // change percentage to number
    values.percentage = parseInt(values.percentage.replace(/\D/g, ""))
    // change paymentStatus to boolean
    values.paymentStatus = values.paymentStatus === 'true'

    return { res: values }
}

//? this fn only Posts validated data
export const createReserv = async (data) => {
    // post on API    
    const res = await postApi(['/reservation/', data]).catch(err => {
        console.error(err)
        //: TODO: create notification system
        return { errors: { someError: err.message } }
    })

    return res
}

//? this fn only Update validated data
export const updateReserv = async (data, id) => {
    // put on API
    const res = await editApi([`/reservation?id=${id}`, data]).catch(err => {
        console.error(err)
        //: TODO: create notification system
        return { errors: { someError: err.message } }
    })

    return res
}

//? this fn Validates AND Posts the data
export const createReservSubmit = async (e) => {
    const { res: values, errors } = validateValues(e)
    if (errors) return { errors }

    // post on API    
    const res = await postApi(['/reservation/', values]).catch(err => {
        console.error(err)
        //: TODO: create notification system
        return { errors: { someError: err.message } }
    })

    return res
}