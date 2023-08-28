import useLedgerMonth from '@/hooks/useLedgerMonth'
import { numberToCurrency } from '@/utils/formUtils'
import React, { useMemo, useState } from 'react'
import Loading from '../common/misc/Loading'
import { MdArrowDownward, MdArrowUpward, MdDateRange, MdOutlineLastPage } from 'react-icons/md'
import Calendar from 'react-calendar'
import LedgerPage from './components/LedgerPage'
import { fancyMonth, isAnotherMonth } from '@/utils/formatDate'
import { isMobile } from '@/utils/isMobile'

const DailyView = ({ date: DATE }) => {
    // date trigerea una nueva busqueda si cambia
    const [date, setDate] = useState(DATE)
    const { month, isLoading, isValidating, mutate } = useLedgerMonth(date)
    // esta fecha se muestra al usuario
    // y la utilzia el memo para buscar las entradas
    const [selectedDate, setSelectedDate] = useState(DATE)
    // esta es la data a renderizar
    const [selectedDay, setSelectedDay] = useState(false)
    const mobile = isMobile()
    const [colapsed, setColapsed] = useState(mobile)

    const {
        income,
        expense,
        total,
        usd
    } = month?.balance || false

    useMemo(() => {
        if (month?.entries) {
            const aux = month?.entries.filter(e => e.date === selectedDate)
            setSelectedDay(() => aux)
        } else setSelectedDay(() => [])
    }, [selectedDate, month])

    const handler = (d) => {
        const newDate = new Date(d).toLocaleDateString('en')
        // cambiar esta fecha trigerea el memo
        setSelectedDate(() => newDate)

        // si la nueva fecha es de otro mes o año
        if (isAnotherMonth(date, d)) {
            // pedimos la nueva data al back
            setSelectedDay(() => false)
            // cambiar esta fecha trigerea una request
            // al mutar "month" se trigerea el memo
            setDate(() => newDate)
        }
    }

    //? Resaltar pagos con USD agregar al Calendar => tileContent={tileContent}
    // function tileContent({ date, view }) {
    //     // Add class to tiles in month view only
    //     if (view === 'month') {
    //         // Check if a date React-Calendar wants to check is on the list of dates to add class to
    //         if (month?.badCurrencyList.find(dDate => isSameDay(dDate, date))) {
    //             return <span className={`absolute top-1 right-1 h-2 w-2 flex items-center bg-rose-500 rounded-full`}>
    //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90"></span>
    //             </span>;
    //         }
    //     }
    // }

    return (
        <div className='h-full w-full flex justify-between fade-in overflow-x-hidden'>

            <section className='h-fit'>
                {(isLoading || isValidating) &&
                    <div className='relative h-1 -mb-1'>
                        <span className='loading-container'>
                            <Loading />
                        </span>
                    </div>}

                {selectedDay && <LedgerPage data={selectedDay} mutate={mutate} date={selectedDate} editEnable={true} />}

            </section>

            <section className={`h-full border-l relative flex flex-col justify-between border-l-slate-800 ml-4 pl-4 ${colapsed ? '-mr-80' : 'mr-0'} transition-all`}>

                <button className={`btn-icon py-1 absolute top-2 -left-5 rounded-l bg-slate-800 ${colapsed ? 'px-1 -left-10' : ''} transition-none`}
                    onClick={() => setColapsed(!colapsed)}>
                    {colapsed ? <MdDateRange /> : <MdOutlineLastPage />}
                </button>

                <Calendar onChange={handler} locale={'es-Ar'} />

                <section className='grid grid-cols-3 items-center text-right pr-4 pt-4 mb-8 fade-in'>
                    <div className='col-span-3 text-left text-2xl pl-1 mb-2'>
                        Balance {fancyMonth(selectedDate)}
                    </div>
                    <p className='col-span-1 text-gray-400'>Ingreso:</p>
                    <div className='col-span-2'></div>

                    <p className='col-span-1 text-gray-600 mt-auto'>ARS</p>
                    <p className='col-span-2 text-emerald-500 text-xl'>{numberToCurrency(income || 0)}</p>

                    {usd?.income > 0 && <>
                        <p className='col-span-1 text-gray-600 mt-auto'>USD</p>
                        <p className='col-span-2 text-emerald-500 text-xl'>{numberToCurrency(usd?.income || 0)}</p>
                    </>}

                    <p className='col-span-1 text-gray-400 mt-2'>Pérdida:</p>
                    <div className='col-span-2'></div>

                    <p className='col-span-1 text-gray-600 mt-auto'>ARS</p>
                    <p className='col-span-2 text-rose-500 text-xl'>-{numberToCurrency(expense || 0)}</p>

                    {usd?.expense < 0 && <>
                        <p className='col-span-1 text-gray-600 mt-auto'>USD</p>
                        <p className='col-span-2 text-emerald-500 text-xl'>{numberToCurrency(usd?.expense || 0)}</p>
                    </>}

                    <p className='col-span-1 text-gray-400 place-self-end mt-2'>Total Neto:</p>
                    <div className='col-span-2'></div>

                    <p className='col-span-1 text-gray-600 mt-auto'>ARS</p>
                    <div className={`w-fit place-self-end col-span-2 text-xl font-medium txt-n-icon justify-end border-t border-t-slate-700 ${total < 0 ? 'text-rose-500' : total > 0 ? 'text-emerald-500' : ''}`}>
                        {total < 0 ? <MdArrowDownward /> : total > 0 ? <MdArrowUpward /> : ''}
                        <p>{(total < 0 ? '-' : '') + numberToCurrency(total || 0)}</p>
                    </div>

                    {usd?.total > 0 && <>
                        <p className='col-span-1 text-gray-600 mt-auto'>USD</p>
                        <div className={`w-fit place-self-end col-span-2 text-xl font-medium txt-n-icon justify-end ${usd?.total < 0 ? 'text-rose-500' : usd?.total > 0 ? 'text-emerald-500' : ''}`}>
                            {usd?.total < 0 ? <MdArrowDownward /> : usd?.total > 0 ? <MdArrowUpward /> : ''}
                            <p>{(usd?.total < 0 ? '-' : '') + numberToCurrency(usd?.total || 0)}</p>
                        </div>
                    </>}
                </section>
            </section>

        </div>
    )
}

export default DailyView