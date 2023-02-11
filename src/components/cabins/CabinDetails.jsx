import { useParams } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'
import { useState } from 'react'
import ReservationMiniCard from '@/components/common/cards/ReservationMiniCard'
import ReservationCard from '@/components/common/cards/ReservationCard'
import { MdOutlineBookmark } from 'react-icons/md';

const CabinDetails = () => {
    const { id } = useParams()
    const { cabins, isLoading } = useCabins()
    const cabin = cabins ? cabins.find(c => c.id === id) : false
    const reserv = cabin?.current_guest
    console.log(reserv);
    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const handleCreate = (e) => {
        console.log('handleCreate');
    }
    const handleEdit = (e) => {
        console.log('handleEdit');
    }
    const handleDelete = (e) => {
        console.log('handleDelete');
    }

    return (
        <>
            {isLoading && <p>Cargando...</p>}
            {cabin &&
                <div className='grid gap-4'>
                    <section>
                        <h1>{cabin?.name}</h1>
                        <p>
                            <i className='text-xs opacity-75 mx-2'>ID: {cabin.id || '-'}</i>
                        </p>
                        <button className='btn-primary' onClick={handleCreate}>Crear reserva en esta cabaña</button>
                        <button className='btn-tertiary' onClick={handleEdit}>editar</button>
                        <button className='btn-tertiary' onClick={handleDelete}>borrar</button>
                    </section>

                    <section className='p-4 rounded-lg bg-slate-200 dark:bg-slate-800'>
                        {cabin?.current_guest
                            ? <>
                                {showDetails
                                    ? <section>
                                        <p className='flex items-center cursor-pointer' onClick={toggleDetails}><MdOutlineBookmark className='mr-2' />Reserva actual (menos detalles)</p>
                                        <ReservationCard data={reserv} />
                                    </section>
                                    : <section onClick={toggleDetails} className='cursor-pointer'>
                                        <p className='flex items-center'><MdOutlineBookmark className='mr-2' /> Reserva actual (más detalles)</p>
                                    </section>}
                            </>
                            : <p>Libre</p>
                        }
                    </section>

                    <section>
                        <p>Futuras reservas:</p>
                        {!!cabin?.reservations.length &&
                            <>
                                {cabin?.reservations.map(e => (
                                    (cabin?.current_guest !== e.reservation_id) && <ReservationMiniCard key={e.reservation_id} data={e} />
                                ))}
                            </>
                        }
                    </section>

                </div>}
        </>
    )
}

export default CabinDetails