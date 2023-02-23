import { quickPayment } from '@/utils/reservSubmitHandlers'
import React, { useState } from 'react'
import { useNotifications } from 'reapop'
import { mutate } from 'swr'
import Switch from '../misc/Switch'
import ReservExtraPay from './ReservExtraPay'

const QuickPayment = ({ id, status }) => {

    const { notify } = useNotifications()
    const [paymentStatus, setPaymentStatus] = useState(status)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(() => true)

        const res = await quickPayment(e, id)
        if (res?.error) {
            setErrors(() => errors)
            return
        }

        if (!res.error) {
            setErrors(() => false)
            notify(res.message, 'success')
            mutate('/reservation/all')
        } else {
            notify(res.error, 'error')
            setErrors({ ...errors, someError: res.error })
        }
        setLoading(() => false)
    }

    return (
        <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-4'>

            <p className='col-span-4 text-xl -ml-2'>Nuevo pago</p>

            <ReservExtraPay remove={null} errors={errors} ID={''} />

            <label htmlFor='paymentStatus' className={`col-span-4 py-4 border-t border-b border-t-slate-800 border-b-slate-800`}>

                <label className='col-span-2 '>
                    <p>Estado del pago</p>
                    <Switch options={['Completo']} cb={() => setPaymentStatus(!paymentStatus)} state={paymentStatus} />
                </label>

                <span className='text-lg text-gray-500'>
                    El pago de la reserva se guardará como
                    <b className={`text-lg ${paymentStatus ? 'text-emerald-500' : 'text-rose-500'} transition-colors duration-500 uppercase`}>
                        {paymentStatus ? ` completo` : ' incompleto'}
                    </b>
                </span>

                <input type="hidden" id='paymentStatus' name='paymentStatus' value={paymentStatus} className='w-full' />
            </label>

            <button type='submit' className="btn-primary col-start-2 col-span-2 my-2">Continuar</button>

            {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>}
        </form>
    )
}

export default QuickPayment