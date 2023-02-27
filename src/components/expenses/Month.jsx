import useLedgerMonth from '@/hooks/useLedgerMonth'
import { numberToCurrency } from '@/utils/formUtils'
import React from 'react'
import Loading from '../common/misc/Loading'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'

const Month = ({ date }) => {
    const { month, isLoading } = useLedgerMonth(date)
    const {
        income,
        expense,
        total
    } = month?.balance || false

    return (
        <div className='h-full fade-in'>
            <p>Mes: calendario del mes, con detalles en cada día. Opción para seleccionar otro més.</p>

            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            <section className='grid grid-cols-6 border-t border-t-slate-700 text-right pr-4 pt-4 mt-2 fade-in'>
                <div className='col-span-4 text-left text-2xl  pl-4'>
                    Balance Mensual
                </div>
                <p className='col-span-1'>Ingreso:</p>
                <p className='col-span-1 text-emerald-500 text-xl'>{numberToCurrency(income)}</p>

                <p className='col-span-5'>Perdida:</p>
                <p className='col-span-1 text-rose-500 text-xl'>-{numberToCurrency(expense)}</p>

                <p className='col-span-5'>Total Neto:</p>
                <div className={`col-span-1 text-xl font-medium txt-n-icon justify-end border-t border-t-slate-700 ${total < 0 ? 'text-rose-500' : total > 0 ? 'text-emerald-500' : ''}`}>
                    {total < 0 ? <MdArrowDownward /> : total > 0 ? <MdArrowUpward /> : ''}
                    <p>{(total < 0 ? '-' : '') + numberToCurrency(total)}</p>
                </div>
            </section>
        </div>
    )
}

export default Month