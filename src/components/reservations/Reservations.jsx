import useReservations from '@/hooks/useReservations'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReservationList } from './ReservationList'

const Reservations = () => {
    const navigate = useNavigate()
    const { reservations, error, isLoading, setReserations } = useReservations()
    return (
        <div>
            <h1>Reservas</h1>
            <button onClick={() => navigate('/reservations/create')} className='btn-primary'>crear</button>
            {isLoading && <p>Cargando...</p>}
            <ReservationList data={reservations} />
        </div>
    )
}

export default Reservations