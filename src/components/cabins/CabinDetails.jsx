import { useNavigate, useParams } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'
import { useState } from 'react'
import { MdGroups, MdEdit, MdDelete, MdOutlineBookmark, MdEvent, MdCancel } from 'react-icons/md';
import useUser from '@/hooks/useUser'
import { deleteApi } from '@/services/api'
import { useNotifications } from 'reapop';
import useModal from '@/hooks/useModal'
import Modal from '@/utils/Modal'
import Loading from '../common/misc/Loading'
import Header from '../common/misc/Header'
import ReservationList from './components/ReservationList'
import CurrentGuest from './components/CurrentGuest';
import CreateReservation from '../reservations/CreateReservation';
import Switch from '../common/misc/Switch';
import { changeAvailability } from '@/utils/handlers/cabinSubmitHandler';
// import { isMobile } from '@/utils/isMobile';

const CabinDetails = () => {
    const { id } = useParams()
    const { admin } = useUser()
    const { cabins, error, isLoading, setCabins } = useCabins()
    const cabin = cabins ? cabins.find(c => c.id === id) : false
    const [creation, setCreation] = useState(false)
    const [someError, setSomeError] = useState('')
    const [section, setSection] = useState(0)
    const navigate = useNavigate()
    const [isOpen, open, close] = useModal()
    const { notify } = useNotifications()
    // const mobile = isMobile()

    //: TODO: terminar esto
    // const handleCreate = () => {

    //     setCreation(() => ({ cabin: cabin.id }))
    // }

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

    const sections = [
        <CurrentGuest cabin={cabin} />,
        <ReservationList cabin={cabin} />,
    ]

    const correctSection = sections[section]

    const availabilityHandler = async () => {
        const res = await changeAvailability(id)
        if (!res.error) {
            notify(res.message, 'success')
            setCabins(res.cabinsList)
        } else {
            notify(res.error, 'error')
        }
    }

    const TITLE = <>
        <p className={cabin?.enabled ? '' : 'text-rose-500'}>{cabin?.name}</p>

        <p className='ml-4 txt-n-icon text-xl items-center text-gray-400'>
            <MdGroups />
            {` ${cabin?.capacity || '?'}`}
        </p>
    </>

    return (
        <>
            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            {cabin &&
                <div className='grid gap-4 p-2 my-1 relative fade-in'>

                    <Header title={TITLE}
                        sections={[
                            <p className='txt-n-icon'><MdOutlineBookmark />Reserva actual</p>,
                            <p className='txt-n-icon'><MdEvent />Próximas reserv.</p>
                        ]}
                        section={section} setSection={setSection}
                    // button={<button className={`btn-primary absolute ${mobile ? 'top-8 right-2' : 'top-2 right-8'}`} onClick={handleCreate}>Crear reserva</button>} 
                    />

                    <p className='absolute text-9xl font-black opacity-10 -z-10 top-0 left-0'>{cabin?.identifier}</p>

                    {admin &&
                        <div className='w-fit flex gap-6 justify-between absolute top-4 right-4 z-10'>

                            <span className={'text-rose-500'}>
                                <Switch options={['deshabilitada']} state={!cabin?.enabled} cb={availabilityHandler} />
                            </span>
                            <button className='btn-icon' onClick={handleEdit}>
                                <MdEdit />
                            </button>
                            <button className='btn-icon' onClick={open}>
                                <MdDelete />
                            </button>
                        </div>}

                    <section>
                        {correctSection}
                    </section>

                </div>}

            {(error || someError) && <b>error: {error?.message || someError}</b>}
            <p><i className='text-xs opacity-50 mx-2'>ID: {cabin?.id || '-'}</i></p>

            {
                creation &&
                <section className='h-screen p-8 absolute top-0 right-0 overflow-y-auto z-30 border-l border-l-slate-700  bg-orange-50 dark:bg-slate-900'>
                    <CreateReservation panelData={creation} cb={() => setCreation(() => false)} />

                    <button className='btn-icon text-xl absolute top-9 right-9'
                        onClick={() => setCreation(() => false)}>
                        <MdCancel />
                    </button>
                </section>
            }

            <Modal isOpen={isOpen} close={close}>
                {<div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
                    <span className='col-span-4'>
                        <p>¿Seguro deseas eliminar este alojamiento?</p>
                        <p>Esta acción es <b>irreversible</b>.</p>
                    </span>

                    <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>
                    <button type='submit' onClick={handleDelete} className="btn-admin-p col-span-2">Continuar</button>

                </div>}
            </Modal>
        </>
    )
}

export default CabinDetails