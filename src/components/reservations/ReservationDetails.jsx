import React, { useState } from 'react'
import useReservations from '@/hooks/useReservations'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteApi } from '@/services/api'
import ClientDetailsCard from '@/components/common/cards/ClientDetailsCard'
import { fancyDate, formatDate } from '@/utils/formatDate'
import ReservationCard from '../common/cards/ReservationCard'

const ReservationDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { reservations, error, isLoading, setReservations } = useReservations()
    const reserv = reservations && reservations.find(r => r.id === id)

    //: TODO: mostrar detalels completos del cliente
    //: TODO: ir a detalles de cabaña
    //: TODO: mostrar fechas detalladas
    //: TODO: formatear monto de pago

    //: TODO: solo mostrar editar/eliminar si el role es Admin o Master

    const handleDelete = async () => {
        const res = await deleteApi(`/reservation?id=${id}`).catch(err => console.error(err))
        setReservations(res.reservationList)
        navigate('/reservations')
    }


    return (
        <div>
            <h1>Detalles de reserva</h1>
            <button className='btn-tertiary' onClick={() => navigate(`/reservations/edit/${id}`)}>editar</button>
            <button className='btn-tertiary' onClick={handleDelete}>eliminar</button>
            {isLoading && <h2>Cargando...</h2>}
            {(isLoading && !reserv) && <h2>Reserva no encontrada</h2>}
            {error && <h2>{error?.message || 'error'}</h2>}

            {reserv &&
                <ReservationCard data={reserv} />
            }
        </div>
    )
}

export default ReservationDetails