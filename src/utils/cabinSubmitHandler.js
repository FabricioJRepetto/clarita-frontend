import { editApi, postApi } from "@/services/api"

export const validateCabinErrors = (values) => {
    let errors = {}

    if (values.name === '-') errors.name = 'Campo requerido'

    if (values.identifier === '-') errors.identifier = 'Campo requerido'
    else if (values.identifier.length > 2) errors.identifier = 'Utiliza como máximo 2 caractéres'

    if (!!Object.keys(errors).length) {
        return errors
    }

    return false
}

export const createCabinSubmit = async (e) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // input validator
    const errors = validateCabinErrors(values)
    if (errors) return { errors }

    // post on API    
    const res = await postApi(['/cabin/', values]).catch(err => {
        console.error(err)
        //: TODO: create notification system
        return { errors: { someError: err } }
    })

    if (res) {
        return { res }
    } else {
        console.error('createSubmit No res');
    }
}

export const editCabinSubmit = async (e, id) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // input validator
    const errors = validateCabinErrors(values)
    if (errors) return { errors }

    // post on API    
    const res = await editApi([`/cabin?id=${id}`, values]).catch(err => {
        console.error(err)
        //: TODO: create notification system
        return { errors: { someError: err } }
    })

    if (res) {
        return { res }
    } else {
        console.error('createSubmit No res');
    }
}