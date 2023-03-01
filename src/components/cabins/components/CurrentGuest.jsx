import React from 'react'
import ReservationCard from '@/components/common/cards/ReservationCard'

const CurrentGuest = ({ cabin }) => {
    const reserv = cabin?.current_guest

    return (
        <section className='p-4'>
            {cabin?.current_guest
                ? <ReservationCard data={reserv} />
                : <p className='text-xl'>Libre</p>
            }
        </section>
    )
}

export default CurrentGuest