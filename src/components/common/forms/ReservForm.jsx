import useCabins from '@/hooks/useCabins'
import React, { useEffect, useRef, useState } from 'react'
import Switch from '@/components/common/misc/Switch'
import { datesValidator, fillDates, numberToCurrency, numberToPercentage } from '@/utils/formUtils'
import { formatCurrency, formatPercentage } from '@/utils/formatInputs'
import { deformatDate } from '@/utils/formatDate'
import ReservExtraPay from './ReservExtraPay'

const ReservForm = ({ handler, cb, edit, panelData }) => {
    const [advance, setAdvance] = useState(false)
    const [extraPayment, setExtraPayment] = useState([])
    const [paymentTypeDetails, setPaymentTypeDetails] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(false)
    // const [total, setTotal] = useState(false)
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
            // for standar values...
            aux.forEach(e => {
                const key = e[0],
                    value = e[1],
                    input = document.getElementById(key)

                if (input) {
                    if (key === 'checkin' || key === 'checkout') {
                        input.value = deformatDate(value)

                    } else if (key === 'cabin') {
                        input.value = value.id

                    } else if (key === 'amount') {
                        input.value = numberToCurrency(value)

                    } else if (key === 'percentage' && value && value !== '-') {
                        setAdvance(() => true)
                        input.value = numberToPercentage(value)

                    } else if (key === 'paymentStatus' && value) {
                        setPaymentStatus(() => true)

                    } else {
                        input.value = value !== '-' ? value : null
                    }
                }
            })
            // for extra payments values...
            if (!!edit?.extraPayments?.length) {
                // set ids to render the extra forms
                const ids = edit?.extraPayments.map(e => `${e.id}-`)
                setExtraPayment(() => ids)

                // timeout to wait the state to triger the render
                setTimeout(() => {
                    edit?.extraPayments.forEach(extra => {
                        const { id } = extra
                        Object.entries(extra).forEach(e => {
                            const key = e[0],
                                value = e[1],
                                input = document.getElementById(`${id}-${key}`)

                            if (input) {
                                if (key === 'amount' && value !== '-') {
                                    input.value = numberToCurrency(value)

                                } else if (key === 'percentage' && value && value !== '-') {
                                    input.value = numberToPercentage(value)

                                } else {
                                    input.value = value !== '-' ? value : null
                                }
                            }
                        })
                    })
                }, 100);
            }
        }
        // eslint-disable-next-line
    }, [edit])

    //: TOTAL
    const totalHandler = (e) => {
        // const fees = document.getElementById('fees').value,
        //     value = parseInt(document.getElementById('amount').value.replace(/\D/g, "")),
        //     total = fees ? value * fees : value
        // let extras = 0

        // if (!!extraPayment?.length) {
        //     for (let i = 0; i < extraPayment.length; i++) {
        //         const id = extraPayment[i],
        //             amount = document.getElementById(id + 'amount').value,
        //             fees = document.getElementById(id + 'fees').value


        //         extras += fees
        //             ? amount * fees
        //             : amount
        //     }
        // }

        // const finalTotal = total + extras
        // console.log('total: ', finalTotal);
        // setTotal(() => finalTotal)
    }

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
        if (e.target.value === 'Tarjeta de crédito') setPaymentTypeDetails(() => 'fees')
        else if (e.target.value === 'MercadoPago') setPaymentTypeDetails(() => 'mp')
        else setPaymentTypeDetails(() => false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { res, errors } = await handler(e)
        if (errors) {
            setErrors(() => errors)
            return
        }
        if (!res.error) {
            setErrors(() => false)
            cb(res)
        } else setErrors({ ...errors, someError: res.error })
    }

    const removeExtraPay = (id) => {
        setExtraPayment(curr => {
            const aux = curr.filter(e => e !== id)
            return aux
        })
    }

    const addExtraPay = () => {
        setExtraPayment(curr => {
            const id = `extra${1 + curr.length}-`
            return [...curr, id]
        })
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
                <label htmlFor='fees' className={`col-span-2 ${paymentTypeDetails === 'fees' ? '' : 'hidden'}`}>
                    <p className='text-gray-500 pl-2'>Cantidad de cuotas</p>
                    <input type="Number" id='fees' name='fees' placeholder='Cuotas' className='w-full' />
                    <div className='error'>{errors?.fees || ''}</div>
                </label>
                <label className={`col-span-2 ${paymentTypeDetails === 'fees' ? '' : 'hidden'}`}></label>

                {/*mpDetails*/}
                <label htmlFor='mpDetails' className={`col-span-4 ${paymentTypeDetails === 'mp' ? '' : 'hidden'}`}>
                    <p className='text-gray-500 pl-2'>Cuenta utilizada</p>
                    <input type="text" id='mpDetails' name='mpDetails' placeholder='Usuario de MercadoPago' className='w-full' />
                    <div className='error'>{errors?.mpDetails || ''}</div>
                </label>

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
                    <input type="text" id='amount' name='amount' placeholder='$' className='w-full' onKeyUp={formatCurrency} onChange={e => totalHandler(e.target.value)} />
                    <div className='error'>{errors?.amount || ''}</div>
                </label>

                <section className='col-span-4 grid grid-cols-4 gap-2 w-full'>
                    {/*switch seña*/}
                    <label className='col-span-2'>
                        <p className='text-gray-500 pl-1'>es una seña</p>
                        <Switch options={['No', 'Si']} cb={() => setAdvance(!advance)} state={advance} />
                        <div className='error'>{errors?.advance || ''}</div>
                        <input type="hidden" id='advance' name='advance' value={advance} className='w-full' />
                    </label>

                    {/*percentage para señas*/}
                    <label htmlFor='percentage' className={`col-span-2 ${advance ? '' : 'hidden'}`}>
                        <p className='text-gray-500 pl-2'>pocentaje del total</p>
                        <input type="text" id='percentage' name='percentage' placeholder='%' className='w-full' onKeyUp={formatPercentage} />
                        <div className='error'>{errors?.percentage || ''}</div>
                    </label>
                </section>

                {/*//? PAGOS EXTRA */}
                {!!extraPayment?.length && <>
                    {extraPayment.map(id => (
                        <ReservExtraPay key={id} remove={removeExtraPay} errors={errors} ID={id} />
                    ))}
                </>}

                <button type='button'
                    onClick={addExtraPay}
                    className='btn-secondary col-start-2 col-span-2'>
                    + Pago Extra
                </button>

                {/*//? paymentStatus */}
                <label htmlFor='paymentStatus' className={`col-span-4 mt-4 pt-4 border-t border-b border-t-slate-800 border-b-slate-800`}>

                    {/*//: TOTAL */}
                    {/* <label className='col-span-4 flex justify-between items-baseline border-b border-b-slate-800 mb-4 pb-4'>
                        <p className='text-xl'>Total</p>
                        <b className='text-2xl'>{numberToCurrency(total)}</b>
                    </label> */}

                    <label className='col-span-2 '>
                        <p>Estado del pago</p>
                        <Switch options={['Completo']} cb={() => setPaymentStatus(!paymentStatus)} state={paymentStatus} />
                    </label>

                    <span className='text-lg text-gray-500'>
                        El pago de la reserva se guardará como
                        {paymentStatus
                            ? <b className='text-lg text-emerald-500 uppercase'>{` completo`}</b>
                            : <b className='text-lg text-rose-500 uppercase'>{` incompleto`}</b>
                        }
                    </span>
                    <input type="hidden" id='paymentStatus' name='paymentStatus' value={paymentStatus} className='w-full' />
                    <div className='error'>{errors?.paymentStatus || ''}</div>
                </label>

                {/*//? NOTAS */}
                <p className='col-span-4'>Notas</p>
                <textarea name="notes" id='notes' cols="30" rows="2" placeholder='Notas' className='resize-none col-span-4'></textarea>

                <button className='btn-primary col-start-2 col-span-2 mt-8'>{edit ? 'Guardar' : 'Continuar'}</button>
            </form>
            {errors?.someError && <b>error: {errors.someError}</b>}
        </>
    )
}

export default ReservForm


/*
    - reserva -
        checkin
        checkout
        nights
        pax
        cabin

    - pagos -
        paymentType
            · fees
            · mp acount
        currency
        amount
        advance
            · percentage
    
    - pagos extra -
    - notas -
    - estado del pago -
*/