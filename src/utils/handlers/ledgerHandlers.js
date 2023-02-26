import { editApi, postApi } from "@/services/api"

export const validateLedgerErrors = (values) => {
    let errors = {}

    if (values.entryType === '-') errors.entryType = 'Campo requerido'

    if (values.description === '-') errors.description = 'Campo requerido'

    if (values.amount === '-') errors.amount = 'Campo requerido'

    if (values.currency === '-') errors.currency = 'Campo requerido'

    if (!!Object.keys(errors).length) {
        return errors
    } else return false
}

export const createLedger = async (e, date) => {
    const values = { date }
    Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))

    const errors = validateLedgerErrors(values, '')
    if (errors) return { errors }

    // change currency to number
    values.amount = parseInt(values.amount.replace(/\D/g, ""))

    const res = await postApi([`/ledger`, values])

    return res
}