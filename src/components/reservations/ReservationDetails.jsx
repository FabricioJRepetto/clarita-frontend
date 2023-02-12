import useReservations from '@/hooks/useReservations'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteApi } from '@/services/api'
import ReservationCard from '../common/cards/ReservationCard'
import useUser from '@/hooks/useUser'
import { MdDelete, MdEdit } from 'react-icons/md';

const ReservationDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { admin } = useUser()
    const { reservations, error, isLoading, setReservations } = useReservations()
    const reserv = reservations && reservations.find(r => r.id === id)

    const handleDelete = async () => {
        const res = await deleteApi(`/reservation?id=${id}`).catch(err => console.error(err))
        setReservations(res.reservationList)
        navigate('/reservations')
    }


    return (
        <div className='p-2 my-1 relative'>
            <h1>Detalles de reserva</h1>

            {isLoading && <h2>Cargando...</h2>}
            {(isLoading && !reserv) && <h2>Reserva no encontrada</h2>}
            {error && <h2>{error?.message || 'error'}</h2>}

            {reserv &&
                <>
                    <ReservationCard data={reserv} />

                    {admin && <>
                        <button className='btn-icon absolute top-8 right-20'
                            onClick={() => navigate(`/reservations/edit/${id}`)}>
                            <MdEdit />
                        </button>
                        <button className='btn-icon absolute top-8 right-9'
                            onClick={handleDelete}>
                            <MdDelete />
                        </button>
                    </>}
                </>
            }
        </div>
    )
}

export default ReservationDetails