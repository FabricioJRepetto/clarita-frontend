import useCabins from '@/hooks/useCabins'
import useLoadEditData from '@/hooks/useLoadEditData'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNotifications } from 'reapop'

const CabinForm = ({ handler, cb }) => {
    const { id } = useParams()
    const [errors, setErrors] = useState(false)
    const { cabins } = useCabins()
    const { notify } = useNotifications()

    // if ID, load edit data
    useLoadEditData(cabins)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // check uniqueness
        if (!id) { // if there is an ID, no need to check uniqueness
            let flag = false
            const name = document.getElementById('name').value,
                identifier = document.getElementById('identifier').value

            if (name && cabins.find(c => c.name === name)) {
                setErrors({ ...errors, name: 'El Nombre ya está en uso' })
                flag = true
            }
            if (identifier && cabins.find(c => c.identifier === identifier)) {
                setErrors({ ...errors, identifier: 'El Identificador ya está en uso' })
                flag = true
            }
            console.log('flag', flag);
            if (flag) return
        }

        // all handlers need the event, only edit handlers need ID
        // however, always pass the ID
        const { res, errors: err } = await handler(e, id)
        if (err) {
            notify(err.message, 'error')
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
                    <p className='text-gray-500 pl-2'>Nombre</p>
                    <input type="text" id='name' name='name' placeholder='nombre' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.name || ''}</div>
                </label>
                {/*identifier*/}
                <label htmlFor='identifier' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>Identificador, versión resumida del nombre</p>
                    <input type="text" id='identifier' name='identifier' placeholder='ID' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.identifier || ''}</div>
                </label>
                {/*capacity*/}
                <label htmlFor='capacity' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>Capacidad del alojamiento</p>
                    <input type="number" id='capacity' name='capacity' placeholder='capacidad' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.capacity || ''}</div>
                </label>

                <button className='btn-primary col-start-2 col-span-2'>{id ? 'Guardar' : 'Crear'}</button>
            </form>
            {errors.someError && <b>error: {errors.someError}</b>}
        </>
    )
}

export default CabinForm