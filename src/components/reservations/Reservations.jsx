import useReservations from '@/hooks/useReservations'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReservationList } from './ReservationList'

const Reservations = () => {
    const navigate = useNavigate()
    const { reservations, error, isLoading, } = useReservations()

    return (
        <div>
            <section className='mb-4 flex flex-col md:flex-row justify-between'>
                <h1>Reservas</h1>
                <button onClick={() => navigate('/reservations/create')} className='btn-primary'>Registrar nueva</button>
            </section>

            {isLoading && <p>Cargando...</p>}
            {error && <p>{error || 'Ha ocurrido un error'}</p>}

            <ReservationList data={reservations} />
        </div>
    )
}

export default Reservations