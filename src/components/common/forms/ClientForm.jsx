import { postApi } from '@/services/api'
import React, { useState } from 'react'

const ClientForm = () => {
    const [errorName, setErrorName] = useState('')
    const [errorDni, setErrorDni] = useState('')
    const [errorAge, setErrorAge] = useState('')
    // const [clientData, setClientData] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // obtengo todos los valores de los inputs 
        const values = {}
        Array.from(e.target).map(e => e.name && (values[e.name] = e.value || '-'))
        console.log(values);

        // reviso errores
        if (values.name === '-') setErrorName(() => 'Campo requerido')
        else setErrorName(() => '')

        if (values.dni === '-') setErrorDni(() => 'Campo requerido')
        else setErrorDni(() => '')

        if (values.age === '-') setErrorAge(() => 'Campo requerido')
        else setErrorAge(() => '')

        if (errorName || errorDni || errorAge) {
            console.log('errores en el formulario');
            return
        }

        // envio a la db
        const res = await postApi(['/client/', values])

        if (typeof res === Error) {
            console.log(res);
        } else {
            console.log(res.data);
        }
        // setClientData(() => values)
        //: TODO: mutar /client/all ??
    }

    return (
        <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-2 w-96 p-2'>
            {/*name*/}
            <label htmlFor='name' className='col-span-4'>
                <input type="text" id='name' name='name' placeholder='Nombre y Apellido' className='w-full' />
                <div className='h-6 text-sm text-rose-500'>{errorName || ''}</div>
            </label>
            {/*dni*/}
            <label htmlFor='dni' className='col-span-3'>
                <input type="number" id='dni' name='dni' placeholder='DNI' className='w-full' />
                <div className='h-6 text-sm text-rose-500'>{errorDni || ''}</div>
            </label>
            {/*age*/}
            <label htmlFor='age' className='col-span-1'>
                <input type="number" id='age' name='age' placeholder='Edad' className='w-full' />
                <div className='h-6 text-sm text-rose-500'>{errorAge || ''}</div>
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
            <button className='btn-primary col-start-2 col-span-2'>Guardar</button>
        </form>
    )
}

export default ClientForm