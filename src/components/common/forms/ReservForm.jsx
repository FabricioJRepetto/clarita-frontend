import useCabins from '@/hooks/useCabins'
import React, { useEffect, useRef, useState } from 'react'
import Switch from '@/components/common/Switch'
import { datesValidator, fillDates, numberToCurrency, numberToPercentage } from '@/utils/formUtils'
import { deformatDate } from '@/utils/formatDate'

const ReservForm = ({ handler, cb, edit, panelData }) => {
    const [advance, setAdvance] = useState(false)
    const [file, setFile] = useState(false)
    const [fees, setFees] = useState(false)
    const [errors, setErrors] = useState(false)
    const { cabins, isLoading } = useCabins()
    const [avCabins, setAvCabins] = useState(cabins)
    const checkin = useRef(null)
    const checkout = useRef(null)

    // if panelData, load panel data
    useEffect(() => {
        if (panelData) {
            const aux = Object.entries(panelData)
            aux.forEach(e => {
                const key = e[0],
                    input = document.getElementById(key),
                    value = e[1];

                if (input) {
                    if (key === 'checkin' || key === 'checkout') {
                        input.value = deformatDate(value)
                    } else {
                        input.value = value
                    }
                }
            })
        }
        // eslint-disable-next-line
    }, [panelData])

    // if edit, load edit data
    useEffect(() => {
        if (edit) {
            const aux = Object.entries(edit)
            aux.forEach(e => {
                const key = e[0],
                    input = document.getElementById(key),
                    value = e[1];

                if (input) {
                    if (key === 'checkin' || key === 'checkout') {
                        input.value = deformatDate(value)
                    } else if (key === 'cabin') {
                        input.value = value.id
                    } else if (key === 'percentage' && value !== '-') {
                        setAdvance(() => true)
                        input.value = value
                    } else {
                        input.value = value
                    }
                }
            })
        }
        // eslint-disable-next-line
    }, [edit])

    const datesHandler = (e) => {
        // autofill checkin, checkout or nights
        fillDates(e)
        // if in edit mode, don't change cabin
        if (checkin.current.value && checkout.current.value && !edit) {
            // Looks for available cabins
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
        if (errors) {
            console.log(errors);
            setErrors(() => errors)
            return
        }
        console.log(res);
        if (!res.error) {
            setErrors(() => false)
            cb(res)
        } else setErrors({ ...errors, someError: res.error })
    }

    const formatCurrency = (e) => {
        e.preventDefault()
        const value = e.target.value
        e.target.value = numberToCurrency(value)
    }

    const formatPercentage = (e) => {
        e.preventDefault()
        const value = e.target.value
        e.target.value = numberToPercentage(value)
    }

    return (
        <>
            <form onSubmit={handleSubmit} autoComplete='off' className='grid grid-cols-4 gap-2 w-96 p-2'>
                {/*checkin*/}
                <label htmlFor='checkin' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>checkin</p>
                    <input ref={checkin} type="date" id='checkin' name='checkin' placeholder='Chcekin' className='w-full' onChange={datesHandler} />
                    <div className='error'>{errors?.checkin || ''}</div>
                </label>
                {/*checkout*/}
                <label htmlFor='checkout' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>checkout</p>
                    <input ref={checkout} type="date" id='checkout' name='checkout' placeholder='Checkout' className='w-full' onChange={datesHandler} />
                    <div className='error'>{errors?.checkout || ''}</div>
                </label>
                {/*nights*/}
                <label htmlFor='nights' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>noches</p>
                    <input type="number" id='nights' name='nights' placeholder='Noches' className='w-full' onChange={datesHandler} />
                    <div className='error'>{errors?.nights || ''}</div>
                </label>
                <label className={`col-span-2`}></label>

                {/*persons*/}
                <label htmlFor='persons' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>personas</p>
                    <input type="number" id='persons' name='persons' placeholder='Pax' className='w-full' />
                    <div className='error'>{errors?.persons || ''}</div>
                </label>
                {/*cabin*/}
                <label htmlFor='cabin' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>alojamiento</p>
                    <select disabled={edit} name="cabin" id="cabin" className='w-full'>
                        <option value="" hidden>Selecciona un alojamiento</option>
                        {!isLoading && avCabins && avCabins.map(c => (
                            <option key={c.id || 'errorOpt'} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <div className='error'>{errors?.cabin || ''}</div>
                </label>

                {/*//:MONEY*/}
                <p className='col-span-4 text-xl mt-4 -ml-2'>Pago</p>
                {/*paymentType*/}
                <label htmlFor='paymentType' className='col-span-4'>
                    <p className='text-gray-500 pl-2'>Tipo de pago</p>
                    <select id='paymentType' name='paymentType' onChange={paymentSelect} className='w-full' >
                        <option value="" hidden>Seleccionar uno</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                        <option value="Tarjeta de débito">Tarjeta de débito</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="MercadoPago">MercadoPago</option>
                        <option value="Western Union">Western Union</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <div className='error'>{errors?.paymentType || ''}</div>
                </label>

                {/*fees*/}
                <label htmlFor='fees' className={`col-span-2 ${fees ? '' : 'hidden'}`}>
                    <p className='text-gray-500 pl-2'>Cantidad de cuotas</p>
                    <input type="Number" id='fees' name='fees' placeholder='Cuotas' className='w-full' />
                    <div className='error'>{errors?.fees || ''}</div>
                </label>
                <label className={`col-span-2 ${fees ? '' : 'hidden'}`}></label>

                {/*currency*/}
                <label htmlFor='currency' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>divisa</p>
                    <select id='currency' name='currency' className='w-full' >
                        <option value="" hidden>---</option>
                        <option value="USD">USD</option>
                        <option value="ARS">ARS</option>
                        <option value="CLP">CLP</option>
                        <option value="BRL">BRL</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <div className='error'>{errors?.currency || ''}</div>
                </label>

                {/*amount*/}
                <label htmlFor='amount' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>monto</p>
                    <input type="String" id='amount' name='amount' placeholder='$' className='w-full' onKeyUp={formatCurrency} />
                    <div className='error'>{errors?.amount || ''}</div>
                </label>

                <section className='col-span-4 grid grid-cols-4 gap-2 w-full'>
                    {/*switch seña*/}
                    <label className='col-span-2'>
                        <p className='text-gray-500 pl-1'>es una seña</p>
                        <Switch options={['No', 'Si']} cb={() => setAdvance(!advance)} state={advance} />
                        <div className='error'>{errors?.advance || ''}</div>
                    </label>

                    {/*percentage para señas*/}
                    <label htmlFor='percentage' className={`col-span-2 ${advance ? '' : 'hidden'}`}>
                        <p className='text-gray-500 pl-2'>pocentaje del total</p>
                        <input type="String" id='percentage' name='percentage' placeholder='%' className='w-full' onKeyUp={formatPercentage} />
                        <div className='error'>{errors?.percentage || ''}</div>
                    </label>
                </section>

                {/*//:comprobante*/}
                <p className='col-span-4'>Comprobante</p>
                <section className='col-span-4 grid grid-cols-4 gap-2 w-full'>
                    {/*switch file*/}
                    <label className='col-span-2'>
                        <p className='text-gray-500 pl-1'>adjuntar comprobante</p>
                        <Switch options={['No', 'Si']} cb={() => setFile(!file)} state={file} />
                        <div className='error'>{errors?.file || ''}</div>
                    </label>

                    {/*file input*/}
                    <label htmlFor='comprobante' className={`col-span-2 ${file ? '' : 'hidden'}`}>
                        <p className='text-gray-500 pl-2'>seleccionar archivo</p>
                        <input type="file" id='comprobante' name='comprobante' placeholder='$' className='w-full' />
                        <div className='error'>{errors?.comprobante || ''}</div>
                    </label>
                </section>

                <p className='col-span-4'>Notas</p>
                <textarea name="notes" id='notes' cols="30" rows="2" placeholder='Notas' className='resize-none col-span-4'></textarea>

                {/*paymentStatus*/}
                <label htmlFor='paymentStatus' className={`col-span-4 mt-4`}>
                    <span className='text-lg text-gray-500'>El pago se guardará como
                        {advance
                            ? <b className='text-lg text-rose-500'>{` incompleto`}</b>
                            : <b className='text-lg text-emerald-500'>{` completo`}</b>
                        }
                    </span>
                    <input type="hidden" id='paymentStatus' name='paymentStatus' value={!advance} className='w-full' />
                    <div className='error'>{errors?.paymentStatus || ''}</div>
                </label>

                <button className='btn-primary col-start-2 col-span-2'>{edit ? 'Guardar' : 'Continuar'}</button>
            </form>
            {errors?.someError && <b>error: {errors.someError}</b>}
        </>
    )
}

export default ReservForm