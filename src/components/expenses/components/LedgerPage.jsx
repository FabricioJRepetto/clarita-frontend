import LedgerForm from '@/components/common/forms/LedgerForm'
import { deleteApi } from '@/services/api'
import { fancyDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import React, { useMemo } from 'react'
import { useNotifications } from 'reapop'
import { getBalance } from '../utils/getBalance'
import EntryList from './EntryList'

const LedgerPage = ({ data, date, mutate, editEnable = false }) => {
    const { notify } = useNotifications()

    // const time = new Date(date).getTime()
    // const day = useMemo(() => data?.entries.filter(e => new Date(e.date).getTime() === time) || [], [data, time])
    const {
        income,
        expense,
        total
    } = useMemo(() => getBalance(data), [data])

    const deleteEntry = async (date, id) => {
        const res = await deleteApi(`/ledger?date=${date}&entry_id=${id}`)
        if (res.error) {
            notify(res.error, 'error')
        } else {
            notify(res.message, 'success')
            mutate(res.ledger)
        }
    }

    return (
        <section className='h-full'>
            {date
                ? <>
                    <div className='txt-n-icon justify-between pb-2'>
                        <div className='text-2xl'>
                            Entradas del {<p className='font-semibold capitalize inline'>{fancyDate(date)}</p>}
                        </div>
                    </div>

                    <EntryList data={data} deleteEntry={deleteEntry} date={false} />

                    {editEnable && <LedgerForm />}

                    <section className='grid grid-cols-6 border-t border-t-slate-700 text-right pr-4 pt-4 mt-2'>
                        <p className='col-span-5'>Ingreso:</p>
                        <p className='col-span-1 text-emerald-500 text-xl'>{numberToCurrency(income)}</p>
                        <p className='col-span-5'>Perdida:</p>
                        <p className='col-span-1 text-rose-500 text-xl'>-{numberToCurrency(expense)}</p>
                        <p className='col-span-5'>Total Neto:</p>
                        <p className='col-span-1 text-xl font-medium border-t border-t-slate-700'>{total < 0 ? '-' : ''}{numberToCurrency(total)}</p>
                    </section>
                </>
                : <p className='text-lg text-gray-500 py-4'>Selecciona una fecha para ver registros</p>
            }
        </section>
    )
}

export default LedgerPage