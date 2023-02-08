import { editApi, postApi } from "@/services/api"

export const validateReservErrors = (values) => {
    let errors = {}

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

export const createSubmit = async (e) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))
    console.log(values);

    // input validator
    const errors = validateReservErrors(values)
    if (errors) return { errors }

    // transform dates to correct format
    values.checkin = new Date(values.checkin).toLocaleDateString('en')
    values.checkout = new Date(values.checkout).toLocaleDateString('en')

    // post on API    
    // const res = await postApi(['/client/', values]).catch(err => {
    //     console.error(err)
    //     //: TODO: create notification system
    //     return { errors: { someError: err } }
    // })

    // if (res) {
    //     return { res }
    // } else {
    //     console.error('createSubmit No res');
    // }
}