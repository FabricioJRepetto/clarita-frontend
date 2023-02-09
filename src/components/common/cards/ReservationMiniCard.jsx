import useReservations from '@/hooks/useReservations'
import { fancyDate } from '@/utils/formatDate'
import { useNavigate } from 'react-router-dom'
import { MdPerson, MdEvent } from 'react-icons/md';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const ReservationMiniCard = ({ data }) => {
    const navigate = useNavigate()
    const { reservations, isLoading, error } = useReservations()
    const reserv = reservations ? reservations.find(e => e.id === data.reservation_id) : false

    return (
        <div onClick={() => navigate(`/reservations/details/${reserv.id}`)} className='p-2 border border-slate-300 dark:border-slate-700 rounded-lg'>
            {reserv &&
                <p className='flex items-center'>
                    <MdPerson className='mr-2' />
                    {reserv?.client?.name}
                </p>}
            <p className='flex items-center'>
                <MdEvent className='mr-2' />
                {fancyDate(data.in)}
                <BsFillArrowRightCircleFill className='mx-2' />
                {fancyDate(data.out)}
            </p>
        </div>
    )
}

export default ReservationMiniCard