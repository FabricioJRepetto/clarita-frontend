import { useNavigate, useParams } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'
import { useState } from 'react'
import ReservationMiniCard from '@/components/common/cards/ReservationMiniCard'
import ReservationCard from '@/components/common/cards/ReservationCard'
import { MdOutlineBookmark, MdEdit, MdDelete } from 'react-icons/md';
import useUser from '@/hooks/useUser'
import { deleteApi } from '@/services/api'

const CabinDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { admin } = useUser()
    const { cabins, error, isLoading, setCabins } = useCabins()
    const cabin = cabins ? cabins.find(c => c.id === id) : false
    const reserv = cabin?.current_guest
    const [showDetails, setShowDetails] = useState(true)
    const [someError, setSomeError] = useState('')

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const handleCreate = (e) => {
        console.log('handleCreate');
    }

    const handleEdit = () => {
        navigate(`/cabins/edit/${id}`)
    }

    const handleDelete = async () => {
        const res = await deleteApi(`/cabin?id=${id}`).catch(err => {
            console.error(err)
            setSomeError(err.message)
        })

        if (!res.error) {
            console.log('handleDelete', res.message);
            setCabins(res.cabinsList)
            navigate('/cabins')
        }
    }

    return (
        <>
            {isLoading && <p>Cargando...</p>}
            {cabin &&
                <div className='grid gap-4 p-2 my-1 relative border border-slate-200 dark:border-slate-700 rounded-lg'>

                    <section>
                        <h1>{cabin?.identifier} - {cabin?.name}</h1>
                        <p><i className='text-xs opacity-75 mx-2'>ID: {cabin.id || '-'}</i></p>
                        <button className='btn-primary' onClick={handleCreate}>Crear reserva aquí</button>

                        {admin && <>
                            <button className='btn-icon absolute top-8 right-20' onClick={handleEdit}>
                                <MdEdit />
                            </button>
                            <button className='btn-icon absolute top-8 right-9' onClick={handleDelete}>
                                <MdDelete />
                            </button>
                        </>}
                    </section>

                    <section className='p-4 rounded-lg'>
                        {cabin?.current_guest
                            ? <section>
                                <p className='txt-n-icon text-xl mb-4' onClick={toggleDetails}><MdOutlineBookmark className='mr-2' />Reserva actual</p>
                                <ReservationCard data={reserv} />
                            </section>
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
            {(error || someError) && <b>error: {error?.message || someError}</b>}

        </>
    )
}

export default CabinDetails