import React, { useState } from 'react'
import useReservations from '@/hooks/useReservations'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteApi } from '@/services/api'
import ClientDetailsCard from '@/components/common/cards/ClientDetailsCard'
import { fancyDate, formatDate } from '@/utils/formatDate'

const ReservationDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { reservations, error, isLoading, setReservations } = useReservations()
    const reserv = reservations && reservations.find(r => r.id === id)
    const [clientDetails, setClientDetails] = useState(false)

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
    const toggleClient = () => {
        setClientDetails(!clientDetails)
    }

    return (
        <>
            <h1>Detalles de reserva</h1>
            {isLoading && <h2>Cargando...</h2>}
            {(isLoading && !reserv) && <h2>Reserva no encontrada</h2>}
            {error && <h2>{error?.message || 'error'}</h2>}

            {reserv && <div className='grid gap-4'>
                {clientDetails
                    ? <section>
                        <p onClick={toggleClient}>Cliente: (menos detalles)</p>
                        <ClientDetailsCard user={reserv?.client} />
                    </section>
                    : <section onClick={toggleClient}>
                        <p>Cliente: <b>{reserv?.client?.name || '?'}</b> (más detalles)</p>
                    </section>}
                <section>
                    <p>Cabaña: <b>{reserv?.cabin?.name || '?'}</b> (ir a cacbaña)</p>
                    <p>Fechas:</p>
                    <p className='mx-2'>checkin: <b>{fancyDate(reserv?.checkin)}</b></p>
                    <p className='mx-2'>checkout: <b>{fancyDate(reserv?.checkout)}</b></p>
                </section>

                <section>
                    <p>Personas: <b>{reserv?.persons}</b></p>
                    <p>Vehículo: <b>{reserv?.client?.vehicleType || '-'}</b></p>
                    {reserv?.client?.plate && <p className='mx-2'>Patente: <b>{reserv?.client?.plate}</b></p>}
                </section>

                <section>
                    <p>Pago/seña: <b>{reserv?.paymentType} - ${reserv?.amount}</b></p>
                </section>

                <section>
                    <p>Notas: {reserv?.notes}</p>
                </section>

                <section>
                    <i className='text-xs opacity-75 mx-2'>ID: {reserv?.id}</i>
                </section>
                <br />
                <button className='btn-primary'>editar</button>
                <button className='btn-primary' onClick={handleDelete}>eliminar</button>
            </div>}
        </>
    )
}

export default ReservationDetails