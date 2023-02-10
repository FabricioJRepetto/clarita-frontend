import useCabins from '@/hooks/useCabins'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Switch from '@/components/common/Switch'
import { datesValidator, doDatesOverlap, fillDates } from '@/utils/reservFormUtils'
import { formatDate } from '@/utils/formatDate'

const ReservForm = ({ handler, cb }) => {
    const { id } = useParams()
    const [advance, setAdvance] = useState(false)
    const [fees, setFees] = useState(false)
    const [errors, setErrors] = useState(false)
    const { cabins, error, isLoading, setCabin } = useCabins()
    const [avCabins, setAvCabins] = useState(cabins)
    const checkin = useRef(null)
    const checkout = useRef(null)

    //: TODO: Revalidate cabin availability when date is changed 
    //: TODO: Show available cabins
    //: TODO: calendar (would be good a shortcut here)    

    const datesHandler = (e) => {
        fillDates(e)
        if (checkin.current.value && checkout.current.value) {
            datesValidator(cabins, setAvCabins, setErrors)
        } else {
            setAvCabins(() => cabins)
        }
    }

    const paymentSelect = (e) => {
        e.preventDefault()
        if (e.target.value === 'Tarjeta de crédito') setFees(() => true)
        else setFees(() => false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { res, errors } = await handler(e)
        setErrors(() => errors)
        if (!res.error) cb(res)
        else setErrors({ ...errors, someError: res.error })
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-2 w-96 p-2'>
                {/*checkin*/}
                <label htmlFor='name' className='col-span-2'>
                    <input ref={checkin} type="date" id='checkin' name='checkin' placeholder='Chcekin' className='w-full' onChange={datesHandler} />
                    <div className='h-6 text-sm text-rose-500'>{errors?.checkin || ''}</div>
                </label>
                {/*checkout*/}
                <label htmlFor='name' className='col-span-2'>
                    <input ref={checkout} type="date" id='checkout' name='checkout' placeholder='Checkout' className='w-full' onChange={datesHandler} />
                    <div className='h-6 text-sm text-rose-500'>{errors?.checkout || ''}</div>
                </label>
                {/*nights*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="number" id='nights' name='nights' placeholder='Noches' className='w-full' onChange={datesHandler} />
                    <div className='h-6 text-sm text-rose-500'>{errors?.nights || ''}</div>
                </label>
                {/*cabin*/}
                <label htmlFor='name' className='col-span-4'>
                    <select name="cabin" id="cabin" className='w-full'>
                        <option value="" hidden>Selecciona una cabaña</option>
                        {!isLoading && avCabins && avCabins.map(c => (
                            <option key={c.id || 'errorOpt'} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <div className='h-6 text-sm text-rose-500'>{errors?.cabin || ''}</div>
                </label>
                {/*persons*/}
                <label htmlFor='name' className='col-span-2'>
                    <input type="number" id='persons' name='persons' placeholder='Pax' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.persons || ''}</div>
                </label>

                {/*//:MONEY*/}
                <p className='col-span-4'>Pago</p>
                {/*paymentType*/}
                <label htmlFor='name' className='col-span-3'>
                    {/* <input type="String" id='paymentType' name='paymentType' placeholder='Tipo de pago' className='w-full' /> */}
                    <select id='paymentType' name='paymentType' onChange={paymentSelect} className='w-full' >
                        <option value="" hidden>Tipo de pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                        <option value="Tarjeta de débito">Tarjeta de débito</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <div className='h-6 text-sm text-rose-500'>{errors?.paymentType || ''}</div>
                </label>
                {/*fees*/}
                <label htmlFor='name' className={`col-span-2 ${fees ? '' : 'hidden'}`}>
                    <input type="String" id='fees' name='fees' placeholder='Cantidad de cuotas' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.fees || ''}</div>
                </label>
                {/*amount*/}
                <label htmlFor='name' className='col-span-3'>
                    <input type="String" id='amount' name='amount' placeholder='Monto' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.amount || ''}</div>
                </label>
                {/*switch seña*/}
                <section className='col-span-2'>
                    <Switch options={['Seña']} cb={() => setAdvance(!advance)} />
                </section>
                {/*percentage para señas*/}
                <label htmlFor='name' className={`col-span-2 ${advance ? '' : 'hidden'}`}>
                    <input type="String" id='percentage' name='percentage' placeholder='Porcentaje' className='w-full' />
                    <div className='h-6 text-sm text-rose-500'>{errors?.percentage || ''}</div>
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