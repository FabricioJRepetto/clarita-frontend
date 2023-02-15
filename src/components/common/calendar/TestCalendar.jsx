import useCabins from '@/hooks/useCabins'
import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar'
import './CalendarStyles.css'

const TestCalendar = () => {
    const [date, setDate] = useState(new Date().toLocaleDateString('en'))
    const { cabins, isLoading } = useCabins()
    // const today = new Date()
    // const firstDay = new Date(`${today.getUTCMonth() + 1}/1/${today.getUTCFullYear()}`).getUTCDay()
    // const mm = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    //     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const handler = (d) => {
        const date = new Date(d).toLocaleDateString('en')
        setDate(() => date)

    }

    return (
        <section>
            <header>
                <h1>Calendario</h1>
            </header>

            <div>
                <Calendar onChange={handler} locale={'es-Ar'} />
            </div>

            {isLoading
                ? <p>Cargando</p>
                : <div className='flex flex-col gap-1 w-80'>
                    {date && <p>{date}</p>}
                    {cabins && cabins.map(c => (
                        <p key={c.id} className='rounded-md px-2 w-full bg-slate-800'>{c.identifier}</p>
                    ))}
                </div>}
        </section>
    )
}

export default TestCalendar