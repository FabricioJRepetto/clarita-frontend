import useLedgerMonth from '@/hooks/useLedgerMonth'
import { numberToCurrency } from '@/utils/formUtils'
import React, { useMemo, useState } from 'react'
import Loading from '../common/misc/Loading'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import Calendar from 'react-calendar'
import LedgerPage from './components/LedgerPage'
import { isAnotherMonth } from '@/utils/formatDate'

const Month = ({ date: DATE }) => {
    // date trigerea una nueva busqueda si cambia
    const [date, setDate] = useState(DATE)
    const { month, isLoading, mutate } = useLedgerMonth(date)
    // esta fecha se muestra al usuario
    // y la utilzia el memo para buscar las entradas
    const [selectedDate, setSelectedDate] = useState(DATE)
    // esta es la data a renderizar
    const [selectedDay, setSelectedDay] = useState(false)

    const {
        income,
        expense,
        total
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

    return (
        <div className='h-full w-full flex justify-between fade-in'>

            <section className=''>
                {isLoading &&
                    <div className='relative h-1 mb-2'>
                        <span className='loading-container'>
                            <Loading />
                        </span>
                    </div>}

                {selectedDay && <LedgerPage data={selectedDay} mutate={mutate} date={selectedDate} editEnable={true} />}

            </section>

            <section className='h-full border-l flex flex-col justify-between border-l-slate-800 ml-4 pl-4'>
                <Calendar onChange={handler} locale={'es-Ar'} />

                <section className='grid grid-cols-3 items-center text-right pr-4 pt-4 mb-8 fade-in'>
                    <div className='col-span-3 text-left text-2xl pl-1 mb-2'>
                        Balance Mensual
                    </div>
                    <p className='col-span-1 text-gray-400'>Ingreso:</p>
                    <p className='col-span-2 text-emerald-500 text-xl'>{numberToCurrency(income || 0)}</p>

                    <p className='col-span-1 text-gray-400'>Pérdida:</p>
                    <p className='col-span-2 text-rose-500 text-xl'>-{numberToCurrency(expense || 0)}</p>

                    <p className='col-span-1 text-gray-400 place-self-end'>Total Neto:</p>
                    <div className={`w-fit place-self-end col-span-2 text-xl font-medium txt-n-icon justify-end border-t border-t-slate-700 ${total < 0 ? 'text-rose-500' : total > 0 ? 'text-emerald-500' : ''}`}>
                        {total < 0 ? <MdArrowDownward /> : total > 0 ? <MdArrowUpward /> : ''}
                        <p>{(total < 0 ? '-' : '') + numberToCurrency(total || 0)}</p>
                    </div>
                </section>
            </section>

        </div>
    )
}

export default Month