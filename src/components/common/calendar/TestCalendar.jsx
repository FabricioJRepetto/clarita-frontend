import useCabins from '@/hooks/useCabins'
import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar'
import CalendarCabinCard from './CalendarCabinCard'
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs'
import './CalendarStyles.css'
import CabinCard from '../cards/CabinCard'

const TestCalendar = () => {
    const [date, setDate] = useState(new Date().toLocaleDateString('en'))
    const [selected, setSelected] = useState(false)
    const { cabins, isLoading } = useCabins()

    const handler = (d) => {
        const date = new Date(d).toLocaleDateString('en')
        setDate(() => date)
    }
    const selectCabin = (id) => setSelected(() => id)

    return (
        <section style={{ width: '300px' }} className='flex flex-col gap-8 mr-2'>
            <Calendar onChange={handler} locale={'es-Ar'} />

            {isLoading
                ? <p>Cargando</p>
                : <div className='flex flex-col gap-1'>
                    {cabins && cabins.map(c => (
                        <CalendarCabinCard key={c.id} data={c} date={date} cb={selectCabin} />
                    ))}
                    <p className='txt-n-icon w-full justify-center text-xs text-gray-500'><BsFillCaretDownFill /><p>CHECKIN</p><BsFillCaretUpFill /><p>CHECKOUT</p></p>
                </div>}


            {selected && <CabinCard data={cabins.find(c => c.id === selected)} />}
        </section>
    )
}

export default TestCalendar