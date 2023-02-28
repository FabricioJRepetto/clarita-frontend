import useLedger from '@/hooks/useLedger'
import React, { useMemo, useState } from 'react'
import Loading from '../common/misc/Loading'
import LedgerPage from './components/LedgerPage'
import LedgerWeek from './components/LedgerWeek'
import { getBalance } from './utils/getBalance'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import { numberToCurrency } from '@/utils/formUtils'

const Week = ({ date }) => {
    const { week, isLoading, mutate } = useLedger(date)
    const [day, setDay] = useState(false)

    const {
        income,
        expense,
        total
    } = useMemo(() => {
        const aux = {
            income: 0,
            expense: 0
        }
        Object.values(week || {}).forEach(day => {
            const { income, expense } = getBalance(day)
            aux.income = aux.income + income
            aux.expense = aux.expense + expense
        })
        aux.total = aux.income - aux.expense
        return aux
    }, [week])

    const setDate = (date) => {
        setDay(curr => {
            if (curr === date) {
                return false
            } else return date
        })
    }

    return (
        <div>
            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            <LedgerWeek data={week || {}} setDate={setDate} day={day} />

            {day && <LedgerPage data={week[day]} mutate={mutate} date={day} />}

            {!day &&
                <section className='grid grid-cols-6 border-t border-t-slate-700 text-right pr-4 pt-4 mt-2 fade-in'>
                    <div className='col-span-4 text-left text-2xl  pl-4'>
                        Balance Semanal
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
            }


        </div>
    )
}

export default Week