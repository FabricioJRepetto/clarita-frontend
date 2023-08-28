import useLedger from '@/hooks/useLedger'
import React, { useMemo, useState } from 'react'
import Loading from '../common/misc/Loading'
import LedgerPage from './components/LedgerPage'
import LedgerWeek from './components/LedgerWeek'
import { getBalance } from './utils/getBalance'
import { MdArrowDownward, MdArrowUpward, MdOutlineLastPage, MdDateRange } from 'react-icons/md'
import { numberToCurrency } from '@/utils/formUtils'
import Calendar from 'react-calendar'
import { defineWeek } from '@/utils/defineWeek'

const Week = ({ date }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [colapsed, setColapsed] = useState(false)

    const { week, isLoading, mutate } = useLedger(selectedDate || date)
    const [day, setDay] = useState(false)

    const {
        income,
        expense,
        total,
        usd
    } = useMemo(() => {
        const aux = {
            income: 0,
            expense: 0,
            usd: {
                income: 0,
                expense: 0
            }
        }
        Object.values(week || {}).forEach(day => {
            const { ARS, USD } = getBalance(day)
            aux.income += ARS.income
            aux.expense += ARS.expense
            aux.usd.income += USD?.income
            aux.usd.expense += USD?.expense
        })
        aux.total = aux.income - aux.expense
        aux.usd.total = aux.usd.income - aux.usd.expense

        return aux
    }, [week])

    const setDate = (date) => {
        setDay(curr => {
            if (curr === date) {
                return false
            } else return date
        })
    }

    const dateHandler = (d) => {
        const newDate = new Date(d).toLocaleDateString('en')
        const { start: ogStart } = defineWeek(selectedDate)
        const { start } = defineWeek(newDate)

        // si la nueva fecha es de otra semana
        if (ogStart !== start) {
            setSelectedDate(() => newDate)
            setDay(() => false)
        }
    }

    return (
        <div className='h-full w-full flex justify-between fade-in overflow-x-hidden'>
            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            <section className='h-fit w-full pr-8'>
                <LedgerWeek data={week || {}} setDate={setDate} date={selectedDate} day={day} />

                {day && <LedgerPage data={week[day]} mutate={mutate} date={day} />}

                {!day &&
                    <section className='grid grid-cols-6 border-t border-t-slate-700 text-right pr-4 pt-4 mt-2 fade-in'>
                        <div className='col-span-4 text-left text-2xl  pl-4'>
                            Balance Semanal
                        </div>
                        <p className='col-span-5'>Ingreso:</p>
                        <div className='col-span-1'></div>

                        <p className='col-span-5 text-gray-600 mt-auto'>ARS</p>
                        <p className='col-span-1 text-emerald-500 text-xl'>{numberToCurrency(income)}</p>

                        {usd?.income > 0 && <>
                            <p className='col-span-5 text-gray-600 mt-auto'>USD:</p>
                            <p className='col-span-1 text-emerald-500 text-xl'>{numberToCurrency(usd.income)}</p>
                        </>}

                        <p className='col-span-5 mt-2'>Pérdida:</p>
                        <div className='col-span-1'></div>

                        <p className='col-span-5 text-gray-600 mt-auto'>ARS</p>
                        <p className='col-span-1 text-rose-500 text-xl'>-{numberToCurrency(expense)}</p>

                        {usd?.expense > 0 && <>
                            <p className='col-span-5 text-gray-600 mt-auto'>USD:</p>
                            <p className='col-span-1 text-rose-500 text-xl'>{numberToCurrency(usd.expense)}</p>
                        </>}

                        <p className='col-span-5 mt-2'>Total Neto:</p>
                        <div className='col-span-1'></div>

                        <p className='col-span-5 text-gray-600 mt-auto'>ARS</p>
                        <div className={`w-fit place-self-end col-span-1 text-xl font-medium txt-n-icon justify-end border-t border-t-slate-700 ${total < 0 ? 'text-rose-500' : total > 0 ? 'text-emerald-500' : ''}`}>
                            {total < 0 ? <MdArrowDownward /> : total > 0 ? <MdArrowUpward /> : ''}
                            <p>{(total < 0 ? '-' : '') + numberToCurrency(total)}</p>
                        </div>

                        {usd?.total !== 0 && <>
                            <p className='col-span-5 text-gray-600 mt-auto'>USD</p>
                            <div className={`col-span-1 text-xl font-medium txt-n-icon justify-end ${usd.total < 0 ? 'text-rose-500' : usd.total > 0 ? 'text-emerald-500' : ''}`}>
                                {usd.total < 0 ? <MdArrowDownward /> : usd.total > 0 ? <MdArrowUpward /> : ''}
                                <p>{(usd.total < 0 ? 'USD -' : 'USD ') + numberToCurrency(usd.total)}</p>
                            </div>
                        </>}
                    </section>
                }

            </section>

            <section className={`h-full border-l relative flex flex-col justify-between border-l-slate-800 ml-4 pl-4 ${colapsed ? '-mr-80' : 'mr-0'} transition-all`}>

                <button className={`btn-icon py-1 absolute top-2 -left-5 rounded-l bg-slate-800 ${colapsed ? 'px-1 -left-10 border-r border-slate-600 hover:border-slate-300' : ''} transition-none`}
                    onClick={() => setColapsed(!colapsed)}>
                    {colapsed ? <MdDateRange /> : <MdOutlineLastPage />}
                </button>

                <Calendar onChange={dateHandler} locale={'es-Ar'} />

            </section>

        </div>
    )
}

export default Week