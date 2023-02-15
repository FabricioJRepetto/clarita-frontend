import useCabins from '@/hooks/useCabins'
import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar'
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs'
import CalendarMiniCabinCard from './CalendarMiniCabinCard'
import CalendarCabinCard from './CalendarCabinCard'
import './CalendarStyles.css'

const CabinsCalendar = () => {
    const [date, setDate] = useState(new Date().toLocaleDateString('en'))
    const [selected, setSelected] = useState(false)
    const { cabins, isLoading } = useCabins()

    const handler = (d) => {
        const date = new Date(d).toLocaleDateString('en')
        setDate(() => date)
    }
    const selectCabin = (data) => setSelected(() => data)

    return (
        <section style={{ width: '300px' }} className='flex flex-col gap-8 mr-2'>
            <Calendar onChange={handler} locale={'es-Ar'} />

            {isLoading
                ? <p>Cargando</p>
                : <div className='grid grid-cols-4 gap-1'>
                    {cabins && cabins.map(c => (
                        <CalendarMiniCabinCard key={c.id} data={c} date={date} cb={selectCabin} />
                    ))}
                    <p className='col-span-4 txt-n-icon w-full justify-center text-xs text-gray-500'>
                        <BsFillCaretDownFill />
                        CHECKIN
                        <BsFillCaretUpFill />
                        CHECKOUT
                    </p>
                </div>}


            {selected && <CalendarCabinCard data={selected} />}
        </section>
    )
}

export default CabinsCalendar