import { editApi, postApi } from "@/services/api"

export const validateClientErrors = (values) => {
    let errors = {}

    if (values.name === '-') errors.name = 'Campo requerido'

    if (values.dni === '-') errors.dni = 'Campo requerido'

    if (values.age === '-') errors.age = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    }

    return false
}

export const createSubmit = async (e) => {
    // get all input values 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // input validator
    const errors = validateClientErrors(values)
    if (errors) return { errors }

    // post on API    
    const res = await postApi(['/client/', values]).catch(err => {
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

export const editSubmit = async (e, id) => {
    // obtengo todos los valores de los inputs 
    const values = {}
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    // reviso errores
    const errors = validateClientErrors(values)
    if (errors) return { errors }

    // envio a la db    
    const res = await editApi([`/client?id=${id}`, values]).catch(err => {
        console.error(err)
        //: TODO: create notification system
        return { errors: { someError: err } }
    })

    if (res) {
        return { res }
    } else {
        console.error('editSubmit No res');
    }
}