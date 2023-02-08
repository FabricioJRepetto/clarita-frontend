import { editApi, postApi } from "@/services/api"
import { formatDate } from "./formatDate"

export const validateReservErrors = (values, client) => {
    let errors = {}

    // check client input
    if (client && values.client === '-') errors.client = 'Campo requerido'

    if (values.checkin === '-') errors.checkin = 'Campo requerido'

    if (values.checkout === '-') errors.checkout = 'Campo requerido'

    //: TODO: checkin no puede ser anterior a hoy

    //: TODO: checkout no puede ser anterior a hoy

    //: TODO: checkin y checkout no pueden ser la misma fecha ?

    //: TODO: cantidad de noches no concuerda con checkin y checkout ?

    if (new Date(values.checkin) > new Date(values.checkout)) errors.checkin = 'El checkin no puede ser posterior al checkout'

    if (values.cabin === '-') errors.cabin = 'Campo requerido'

    if (values.paymentType === '-') errors.paymentType = 'Campo requerido'

    if (values.amount === '-') errors.amount = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    }

    return false
}

export const validateValues = (e) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))
    console.log(values);
    // input validator
    const errors = validateReservErrors(values)
    if (errors) return { errors }


    // transform dates to correct format
    values.checkin = formatDate(values.checkin)
    values.checkout = formatDate(values.checkout)

    return { res: values }
}

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

//? this fn posts the already validated data
export const createReserv = async (data) => {
    // post on API    
    const res = await postApi(['/reservation/', data]).catch(err => {
        console.error(err)
        //: TODO: create notification system
        return { errors: { someError: err.message } }
    })

    return res
}