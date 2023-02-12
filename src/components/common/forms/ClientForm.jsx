import useClients from '@/hooks/useClients'
import useLoadEditData from '@/hooks/useLoadEditData'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ClientForm = ({ handler, cb }) => {
    // if there is an ID, it means the form is in edition mode
    const { id } = useParams()
    const [errors, setErrors] = useState(false)
    const { clients } = useClients()

    // if ID, load edit data
    useLoadEditData(clients)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // check uniqueness
        if (!id) { // if there is not an ID, no need to check uniqueness
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
        const { res, errors: err } = await handler(e, id)
        if (err) {
            setErrors(() => err)
            return
        }
        if (!res.error) cb(res)
        else setErrors({ ...errors, someError: res.error })
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-2 w-96 p-2'>
                {/*name*/}
                <label htmlFor='name' className='col-span-4'>
                    <input type="text" id='name' name='name' placeholder='Nombre y Apellido' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.name || ''}</div>
                </label>
                {/*dni*/}
                <label htmlFor='dni' className='col-span-3'>
                    <input type="text" id='dni' name='dni' placeholder='DNI' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.dni || ''}</div>
                </label>
                {/*age*/}
                <label htmlFor='age' className='col-span-1'>
                    <input type="number" id='age' name='age' placeholder='Edad' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.age || ''}</div>
                </label>
                {/*email*/}
                <label htmlFor='email' className='col-span-4'>
                    <input type="string" id='email' name="email" placeholder='Email' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.email || ''}</div>
                </label>
                {/*telephone*/}
                <label htmlFor='telephone' className='col-span-4'>
                    <input type="tel" id='telephone' name="telephone" placeholder='Teléfono' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                {/*profession*/}
                <label htmlFor='profession' className='col-span-2'>
                    <input type="text" id='profession' name="profession" placeholder='Profesión' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                {/*civil_status*/}
                <label htmlFor='civil_status' className='col-span-2'>
                    <select id='civil_status' name="civil_status" defaultValue="" className='w-full' >
                        <option disabled={true} value="">Estado civil</option>
                        <option value={'soltero'}>Soltero</option>
                        <option value={'casado'}>Casado</option>
                        <option value={'divorciado'}>Divorciado</option>
                        <option value={'viudo/a'}>Viudo/a</option>
                        <option value={'otro'}>otro</option>
                    </select>
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                <p className='col-span-4'>Origen</p>
                {/*nationality*/}
                <label htmlFor='nationality' className='col-span-2'>
                    <input type="text" id='nationality' name="nationality" placeholder='Nacionalidad' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                {/*provenance*/}
                <label htmlFor='provenance' className='col-span-2'>
                    <input type="text" id='provenance' name="provenance" placeholder='Procedencia' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                {/*address*/}
                <label htmlFor='address' className='col-span-4' >
                    <input type="text" id='address' name="address" placeholder='Dirección' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                <p className='col-span-4'>Vehículo</p>
                {/*plate*/}
                <label htmlFor='plate'>
                    <input type="text" id='plate' name="plate" placeholder='Patente' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                {/*vehicleType*/}
                <label htmlFor='vehicleType' className='col-span-3'>
                    <input type="text" id='vehicleType' name="vehicleType" placeholder='Vehículo' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'></div>
                </label>
                <p className='col-span-4'>Notas</p>
                <textarea name="notes" cols="30" rows="2" placeholder='Notas' className='resize-none col-span-4'></textarea>
                <button className='btn-primary col-start-2 col-span-2'>{id ? 'Guardar' : 'Crear'}</button>
            </form>
            {errors.someError && <b>error: {errors.someError}</b>}
        </>
    )
}

export default ClientForm