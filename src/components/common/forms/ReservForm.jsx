import { createSubmit } from '@/utils/reservSubmitHandlers'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ReservForm = () => {
    const { id } = useParams()
    const [errors, setErrors] = useState(false)

    //: TODO: useCabin
    //: TODO: render select options based on useCabins data
    //: TODO: Validate cabin availability / show available cabins 
    //: TODO: Revalidate cabin availability when date is changed 

    //: TODO: Validate reserv dates
    //: TODO: transform dates
    //: TODO: if there is a value for nights, calculate checkin or checkout if any is not defined

    //: TODO: calendar / availability checker (would be good a shortcut here)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { res, errors } = await createSubmit(e)
        console.log(errors);
        console.log(res);
        setErrors(() => errors)
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-2 w-96 p-2'>
                {/*checkin*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="date" id='checkin' name='checkin' placeholder='Chcekin' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.checkin || ''}</div>
                </label>
                {/*checkout*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="date" id='checkout' name='checkout' placeholder='Checkout' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.checkout || ''}</div>
                </label>
                {/*nights*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="number" id='nights' name='nights' placeholder='Noches' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.nights || ''}</div>
                </label>
                {/*cabin*/}
                <label htmlFor='name' className='col-span-4'>
                    <select name="cabin" id="cabin" className='w-full'>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                    </select>
                    <div className='h-6 text-sm text-rose-500'>{errors?.cabin || ''}</div>
                </label>
                {/*persons*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="number" id='persons' name='persons' placeholder='Pax' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.persons || ''}</div>
                </label>
                <p className='col-span-4'>Pago/seña</p>
                {/*paymentType*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="String" id='paymentType' name='paymentType' placeholder='Tipo de pago' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.paymentType || ''}</div>
                </label>
                {/*amount*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="String" id='amount' name='amount' placeholder='Monto' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.amount || ''}</div>
                </label>

                <p className='col-span-4'>Notas</p>
                <textarea name="notes" cols="30" rows="2" placeholder='Notas' className='resize-none col-span-4'></textarea>
                <button className='btn-primary col-start-2 col-span-2'>{id ? 'Guardar' : 'Crear'}</button>
            </form>
            {errors?.someError && <b>error: {errors.someError}</b>}
        </>
    )
}

export default ReservForm