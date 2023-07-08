import LedgerForm from '@/components/common/forms/LedgerForm'
import { deleteApi } from '@/services/api'
import { fancyDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import React, { useMemo, useState } from 'react'
import { useNotifications } from 'reapop'
import { getBalance } from '../utils/getBalance'
import EntryList from './EntryList'
import { MdArrowDownward, MdArrowUpward, MdOutlineArrowBackIos } from 'react-icons/md'
import Details from './Details'

const LedgerPage = ({ data, date, mutate, editEnable = false }) => {
    const { notify } = useNotifications()
    const {
        income,
        expense,
        total,
        details
    } = useMemo(() => getBalance(data), [data])

    const [showDetails, setShowDetails] = useState(false)

    const toogleDetails = () => { setShowDetails(d => !d) }

    const deleteEntry = async (date, id) => {
        const res = await deleteApi(`/ledger?date=${date}&entry_id=${id}`)
        if (res.error) {
            notify(res.error, 'error')
            console.warn(res.errors)
        } else {
            notify(res.message, 'success')
            mutate(res.ledger)
        }
    }

    return (
        <section className='h-full fade-in'>
            {date
                ? <>
                    <div className='txt-n-icon justify-between pb-4'>
                        <div className='text-2xl'>
                            Entradas del {<p className='font-semibold capitalize inline'>{fancyDate(date)}</p>}
                        </div>
                    </div>

                    <EntryList data={data} deleteEntry={deleteEntry} mutate={mutate} date={false} />

                    {editEnable && <LedgerForm date={date} mutate={mutate} />}

                    <section className='border-t border-t-slate-700 text-right pr-4 pt-4 mt-2 mb-2'>
                        <div className='text-2xl text-left mb-auto align-text-top'>
                            Balance del día
                        </div>

                        <section className='flex justify-between'>

                            <div className='details-card h-fit w-96'>
                                <section className={`px-4 rounded-lg ${showDetails ? 'selected' : ''} transition-colors`}>
                                    <div className='txt-n-icon justify-between text-base cursor-pointer' onClick={toogleDetails}>
                                        <p className='txt-n-icon select-none'>
                                            Detalles de ingresos
                                        </p>
                                        <MdOutlineArrowBackIos className={`${showDetails ? '-rotate-90' : 'rotate-90'} transition-transform`} />
                                    </div>
                                    {details && showDetails && <Details details={details} />}
                                </section>
                            </div>

                            <div className='grid grid-cols-3 h-fit'>
                                <p className='col-span-1 text-gray-400'>Ingreso:</p>
                                <p className='col-span-2 text-emerald-500 text-xl'>{numberToCurrency(income)}</p>
                                <p className='col-span-1 text-gray-400'>Perdida:</p>
                                <p className='col-span-2 text-rose-500 text-xl'>-{numberToCurrency(expense)}</p>
                                <p className='col-span-1 text-gray-400'>Total Neto:</p>
                                <div className={`w-fit place-self-end col-span-2 text-xl font-medium txt-n-icon justify-end border-t border-t-slate-700 ${total < 0 ? 'text-rose-500' : total > 0 ? 'text-emerald-500' : ''}`}>
                                    {total < 0 ? <MdArrowDownward /> : total > 0 ? <MdArrowUpward /> : ''}
                                    <p>{(total < 0 ? '-' : '') + numberToCurrency(total)}</p>
                                </div>
                            </div>
                        </section>

                    </section>
                </>
                : <p className='text-lg text-gray-500 py-4'>Selecciona una fecha para ver registros</p>
            }
        </section>
    )
}

export default LedgerPage