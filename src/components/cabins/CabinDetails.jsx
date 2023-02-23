import { useNavigate, useParams } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'
import { useState } from 'react'
import ReservationMiniCard from '@/components/common/cards/ReservationMiniCard'
import ReservationCard from '@/components/common/cards/ReservationCard'
import { MdOutlineBookmark, MdEdit, MdDelete } from 'react-icons/md';
import useUser from '@/hooks/useUser'
import { deleteApi } from '@/services/api'
import { useNotifications } from 'reapop';
import useModal from '@/hooks/useModal'
import Modal from '@/utils/Modal'

const CabinDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { admin } = useUser()
    const { cabins, error, isLoading, setCabins } = useCabins()
    const cabin = cabins ? cabins.find(c => c.id === id) : false
    const reserv = cabin?.current_guest
    const [showDetails, setShowDetails] = useState(true)
    const [someError, setSomeError] = useState('')
    const [isOpen, open, close] = useModal()
    const { notify } = useNotifications()

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
            notify(err?.message, 'error')
            setSomeError(err.message)
        })

        if (!res.error) {
            notify(res.message, 'success')
            setCabins(res.cabinsList)
            navigate('/cabins')
        }
    }

    return (
        <>
            {isLoading && <p>Cargando...</p>}
            {cabin &&
                <div className='grid gap-4 p-2 my-1 relative'>

                    <section>
                        <p className='absolute text-9xl font-black opacity-10 -z-10 top-0 left-0'>{cabin?.identifier}</p>

                        <div className='mb-4 flex flex-col md:flex-row justify-between'>
                            <h1>{cabin?.name}</h1>
                            <button className='btn-primary my-auto' onClick={handleCreate}>Crear reserva aquí</button>
                        </div>

                        {admin &&
                            <div className='w-16 flex justify-between absolute top-7 right-64'>
                                <button className='btn-icon' onClick={handleEdit}>
                                    <MdEdit />
                                </button>
                                <button className='btn-icon' onClick={open}>
                                    <MdDelete />
                                </button>
                            </div>}
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
            <p><i className='text-xs opacity-50 mx-2'>ID: {cabin?.id || '-'}</i></p>

            <Modal isOpen={isOpen} close={close}>
                {<div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
                    <span className='col-span-4'>
                        <p>¿Seguro deseas eliminar este alojamiento?</p>
                        <p>Esta acción es <b>irreversible</b>.</p>
                    </span>

                    <button type='submit' onClick={handleDelete} className="btn-primary col-span-2">Continuar</button>
                    <button type='button' onClick={close} className="btn-secondary col-span-2">Cancelar</button>

                    {/* {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>} */}
                </div>}
            </Modal>
        </>
    )
}

export default CabinDetails