import useLedgerMonth from '@/hooks/useLedgerMonth'
import React, { useState } from 'react'
import { formatCurrency } from "@/utils/formatInputs"
import { MdOutlineAddCircle } from 'react-icons/md'
import { createLedger } from '@/utils/handlers/ledgerHandlers'
import { useNotifications } from 'reapop'
import { numberToCurrency } from '@/utils/formUtils'
import { correctDate } from '@/utils/formatDate'
import { deleteApi } from '@/services/api'
import Loading from '../common/misc/Loading'

const Week = () => {
    const date = new Date(new Date()).toLocaleDateString('en')
    const { month, isLoading, mutate } = useLedgerMonth(date)
    const [errors, setErrors] = useState({})
    const { notify } = useNotifications()

    const handler = async (e) => {
        e.preventDefault()
        const res = await createLedger(e, date)
        if (res.errors) {
            setErrors(() => ({ ...res.errors }))
        }
        notify(res.message || res.error)
    }

    const deleteEntry = async (ledger, id) => {
        console.log(ledger, id);
        const res = await deleteApi(`/ledger?ledger_id=${ledger}&entry_id=${id}`)
        if (res.error) {
            notify(res.error, 'error')
        } else {
            notify(res.message, 'success')
            mutate(res.ledger)
        }

    }

    return (
        <div className='grid gap-4'>
            <p>Semana: Resumen de la semana, opción de nuevo registro.</p>

            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            <section className='grid grid-cols-7 gap-2'>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Domingo
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Lunes
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Martes
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Miercoles
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Jueves
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Viernes
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Sabado
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
            </section>

            <section>
                <div className='txt-n-icon justify-between border px-4 py-2'>
                    <p className='text-xl'>Entradas hoy {month?.entries.length}</p>
                </div>
                {!!month?.entries?.length &&
                    month.entries.map(e => (
                        <p key={e.id} onClick={() => deleteEntry(month.id, e._id)}>
                            {`${e.entryType} / 
                            ${e.description} /                            
                             ${numberToCurrency(e.amount)} ${e.currency} / 
                             ${correctDate(e.date)}`}
                        </p>
                    ))
                }
            </section>

            <section className='w-full'>
                <form onSubmit={handler} autoComplete='off' className='grid grid-cols-8 gap-2'>
                    {/*tipo*/}
                    <label htmlFor='entryType' className='col-span-1'>
                        <p className='text-gray-500 pl-2'>tipo</p>
                        <select name="entryType" id="entryType" className='w-full'>
                            <option value={'expense'}>Gasto</option>
                            <option value={'income'}>Ingreso</option>
                        </select>
                        <div className='h-6 text-sm text-rose-500'>{errors?.entryType || ''}</div>
                    </label>

                    {/*descripcion*/}
                    <label htmlFor='description' className='col-span-4'>
                        <p className='text-gray-500 pl-2'>descripción</p>
                        <input type="text" id='description' name='description' placeholder='Descripción' className='w-full' />
                        <div className='h-6 text-sm text-rose-500'>{errors?.description || ''}</div>
                    </label>

                    {/*monto*/}
                    <label htmlFor='amount' className='col-span-1'>
                        <p className='text-gray-500 pl-2'>monto</p>
                        <input type="text" id='amount' name='amount' placeholder='Monto' className='w-full' onKeyUp={formatCurrency} />
                        <div className='h-6 text-sm text-rose-500'>{errors?.amount || ''}</div>
                    </label>

                    {/*currency*/}
                    <label htmlFor='currency' className='col-span-1'>
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

                    <label htmlFor='submit' className='pt-6 col-span-1 '>
                        <button type='submit' id='submit' className="txt-n-icon btn-primary justify-center w-full px-0">
                            <MdOutlineAddCircle />
                            Registrar
                        </button>
                    </label>

                </form>
            </section>
        </div>
    )
}

export default Week