import React from 'react'
import ReservationMiniCard from '@/components/common/cards/ReservationMiniCard';

const ReservationList = ({ cabin }) => {
    return (
        <section className='grid gap-2'>
            {!!cabin?.reservations.length &&
                <>
                    {cabin?.reservations.map(e => (
                        (cabin?.current_guest !== e.reservation_id) && <ReservationMiniCard key={e._id} data={e} />
                    ))}
                </>
            }
        </section>
    )
}

export default ReservationList