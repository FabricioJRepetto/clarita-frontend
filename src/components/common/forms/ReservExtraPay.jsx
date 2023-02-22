import { formatCurrency, formatPercentage } from '@/utils/formatInputs'
import React, { useEffect, useState } from 'react'
import Switch from '../misc/Switch'

const ReservExtraPay = ({ remove, error, ID }) => {
    const [fees, setFees] = useState(false)
    const [mp, setMp] = useState(false)
    const [advance, setAdvance] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        console.log(error);
        error && setErrors(() => error)
    }, [error])

    const paymentSelect = (e) => {
        e.preventDefault()
        if (e.target.value === 'Tarjeta de crédito') setFees(() => true)
        else if (e.target.value === 'MercadoPago') setMp(() => true)
        else setFees(() => false)
    }

    return (
        <section id={ID} className='relative col-span-4'>
            <button type='button' onClick={() => remove(ID)} className='btn-tertiary absolute top-4 right-0'>quitar</button>

            <p className='col-span-4 text-xl mt-4 -ml-2'>Pago Extra</p>
            {/*paymentType*/}
            <label htmlFor={`${ID}paymentType`} className='col-span-4'>
                <p className='text-gray-500 pl-2'>Tipo de pago</p>
                <select id={`${ID}paymentType`} name={`${ID}paymentType`} onChange={paymentSelect} className='w-full' >
                    <option value="" hidden>Seleccionar uno</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                    <option value="Tarjeta de débito">Tarjeta de débito</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="MercadoPago">MercadoPago</option>
                    <option value="Western Union">Western Union</option>
                    <option value="Otro">Otro</option>
                </select>
                <div className='error'>{errors[`${ID}paymentType`] || ''}</div>
            </label>

            {/*fees*/}
            <label htmlFor={`${ID}fees`} className={`col-span-2 ${fees ? '' : 'hidden'}`}>
                <p className='text-gray-500 pl-2'>Cantidad de cuotas</p>
                <input type="Number" id={`${ID}fees`} name={`${ID}fees`} placeholder='Cuotas' className='w-full' />
                <div className='error'>{errors[`${ID}fees`] || ''}</div>
            </label>
            <label className={`col-span-2 ${fees ? '' : 'hidden'}`}></label>

            {/*mpDetails*/}
            <label htmlFor={`${ID}mpDetails`} className={`col-span-4 ${mp ? '' : 'hidden'}`}>
                <p className='text-gray-500 pl-2'>Cuenta utilizada</p>
                <input type="text" id={`${ID}fees`} name={`${ID}fees`} placeholder='Usuario de MercadoPago' className='w-full' />
                <div className='error'>{errors[`${ID}fees`] || ''}</div>
            </label>

            {/*currency*/}
            <label htmlFor={`${ID}currency`} className='col-span-2'>
                <p className='text-gray-500 pl-2'>divisa</p>
                <select id={`${ID}currency`} name={`${ID}currency`} className='w-full' >
                    <option value="" hidden>---</option>
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                    <option value="CLP">CLP</option>
                    <option value="BRL">BRL</option>
                    <option value="EUR">EUR</option>
                </select>
                <div className='error'>{errors[`${ID}currency`] || ''}</div>
            </label>

            {/*amount*/}
            <label htmlFor={`${ID}amount`} className='col-span-2'>
                <p className='text-gray-500 pl-2'>monto</p>
                <input type="String" id={`${ID}amount`} name={`${ID}amount`} placeholder='$' className='w-full' onKeyUp={formatCurrency} />
                <div className='error'>{errors[`${ID}amount`] || ''}</div>
            </label>

            <section className='col-span-4 grid grid-cols-4 gap-2 w-full'>
                {/*switch seña*/}
                <label className='col-span-2'>
                    <p className='text-gray-500 pl-1'>es una seña</p>
                    <Switch options={['No', 'Si']} cb={() => setAdvance(!advance)} state={advance} />
                    <div className='error'>{errors?.advance || ''}</div>
                </label>

                {/*percentage para señas*/}
                <label htmlFor={`${ID}percentage`} className={`col-span-2 ${advance ? '' : 'hidden'}`}>
                    <p className='text-gray-500 pl-2'>pocentaje del total</p>
                    <input type="String" id={`${ID}percentage`} name={`${ID}percentage`} placeholder='%' className='w-full' onKeyUp={formatPercentage} />
                    <div className='error'>{errors[`${ID}percentage`] || ''}</div>
                </label>
            </section>
        </section>
    )
}

export default ReservExtraPay