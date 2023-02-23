import useReservations from '@/hooks/useReservations'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteApi } from '@/services/api'
import ReservationCard from '../common/cards/ReservationCard'
import useUser from '@/hooks/useUser'
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from '@/utils/Modal'
import useModal from '@/hooks/useModal'
import { useNotifications } from 'reapop';

const ReservationDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { admin } = useUser()
    const { reservations, error, isLoading, setReservations } = useReservations()
    const reserv = reservations && reservations.find(r => r.id === id)
    const [isOpen, open, close] = useModal()
    const { notify } = useNotifications()

    const handleDelete = async () => {
        const res = await deleteApi(`/reservation?id=${id}`)
            .catch(err => notify(err.message, 'error'))

        notify(res.message, 'success')
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
                            onClick={open}>
                            <MdDelete />
                        </button>
                    </>}
                </>
            }

            <Modal isOpen={isOpen} close={close}>
                {<div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
                    <span className='col-span-4'>
                        <p>¿Seguro deseas eliminar esta reserva?</p>
                        <p>Esta acción es <b>irreversible</b>.</p>
                    </span>

                    <button type='submit' onClick={handleDelete} className="btn-admin-p col-span-2">Continuar</button>
                    <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>

                    {/* {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>} */}
                </div>}
            </Modal>
        </div>
    )
}

export default ReservationDetails