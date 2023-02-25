import countries from '@/countryList'
import useClients from '@/hooks/useClients'
import useLoadEditData from '@/hooks/useLoadEditData'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNotifications } from 'reapop'

const CompanyForm = ({ handler, cb, edit_id }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState(false)
    const { clients } = useClients()
    const { notify } = useNotifications()

    // if ID, load edit data
    useLoadEditData(clients, edit_id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // check uniqueness
        if (!id && !edit_id) { // if there is not an ID, no need to check uniqueness
            let flag = false
            const dni = document.getElementById('dni').value,
                email = document.getElementById('email').value

            if (dni && clients.find(c => c.dni === dni)) {
                setErrors({ ...errors, dni: 'El DNI ya está en uso' })
                flag = true
            }
            if (email && clients.find(c => c.email === email)) {
                setErrors({ ...errors, email: 'El email ya está en uso' })
                flag = true
            }

            if (flag) return
        }

        // all handlers need the event, only edit handlers need ID
        // however, always pass the ID
        const { res, errors: err } = await handler(e, id || edit_id)
        if (err) {
            setErrors({ ...err })
            return
        }
        if (!res.error) {
            notify(res?.message, 'success')
            cb(res)
        }
        else {
            notify(res.error, 'error')
            setErrors({ ...errors, someError: res.error })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-2 w-96'>
                {/*name*/}
                <label htmlFor='name' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>nombre</p>
                    <input type="text" id='name' name='name' placeholder='Nombre y Apellido' className='w-full' />
                    <div className='pl-2 h-6 text-sm text-rose-500'>{errors?.name || ''}</div>
                </label>

                {/*cuil*/}
                <label htmlFor='cuil' className='col-span-3'>
                    <p className='text-gray-500 pl-2'>cuil</p>
                    <input type="text" id='cuil' name='cuil' placeholder='CUIL' className='w-full' />
                    <div className='pl-2 h-6 text-sm text-rose-500'>{errors?.cuil || ''}</div>
                </label>

                {/*email*/}
                <label htmlFor='email' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>email</p>
                    <input type="string" id='email' name="email" placeholder='Email' className='w-full' />
                    <div className='pl-2 h-6 text-sm text-rose-500'>{errors?.email || ''}</div>
                </label>

                {/*telephone*/}
                <label htmlFor='telephone' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>teléfono</p>
                    <input type="tel" id='telephone' name="telephone" placeholder='Teléfono' className='w-full' />
                    <div className='pl-2 h-6 text-sm text-rose-500'></div>
                </label>

                <p className='col-span-4'>Origen</p>
                {/*nationality*/}
                <label htmlFor='nationality' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>nacionalidad</p>
                    {/* <input type="text" id='nationality' name="nationality" placeholder='Nacionalidad' className='w-full' /> */}
                    <select id='nationality' name="nationality" defaultValue='' className='w-full' >
                        <option disabled={true} value="">Nacionalidad</option>
                        {Object.values(countries).map((e, i) => (
                            <option key={e + i} value={e}>{e}</option>
                        ))}
                    </select>
                    <div className='pl-2 h-6 text-sm text-rose-500'></div>
                </label>

                {/*provenance*/}
                <label htmlFor='provenance' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>procedencia</p>
                    <input type="text" id='provenance' name="provenance" placeholder='Procedencia' className='w-full' />
                    <div className='pl-2 h-6 text-sm text-rose-500'></div>
                </label>
                {/*address*/}
                <label htmlFor='address' className='col-span-4' >
                    <p className='text-gray-500 pl-2'>dirección</p>
                    <input type="text" id='address' name="address" placeholder='Dirección' className='w-full' />
                    <div className='pl-2 h-6 text-sm text-rose-500'></div>
                </label>

                <p className='col-span-4'>Notas</p>
                <textarea name="notes" cols="30" rows="3" placeholder='Notas' className='resize-none col-span-4'></textarea>
                <button className='btn-primary col-start-2 col-span-2'>{id || edit_id ? 'Guardar' : 'Crear'}</button>
            </form>
            {errors.someError && <b>error: {errors.someError}</b>}
        </>
    )
}

export default CompanyForm