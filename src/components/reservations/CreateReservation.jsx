import React, { useEffect, useState } from 'react'
import PreReservForm from '@/components/common/forms/PreReservForm'
import { createSubmit } from '@/utils/clientSubmitHandlers'
import useClients from '@/hooks/useClients'
import ReservForm from '@/components/common/forms/ReservForm'
import { createReserv, updateReserv, validateValues } from '@/utils/reservSubmitHandlers'
import useReservations from '@/hooks/useReservations'
import { useNavigate, useParams } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'
import ReservPreview from '@/components/common/forms/ReservPreview'
import { MdEmail, MdCall, MdPlace, MdDirectionsCar, MdEdit, MdDelete } from 'react-icons/md';


const CreateReservation = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { cabins } = useCabins()
    const { clients, setClients } = useClients()
    const { reservations, setReservations } = useReservations(id)
    const [editData, setEditData] = useState(false)
    const [client, setClient] = useState(false)
    const [preview, setPreview] = useState(false)
    const [errors, setErrors] = useState(false)

    // if ID, load edit data
    useEffect(() => {
        if (id) {
            const data = reservations.find(r => r.id === id)
            if (data) {
                setEditData(() => data)
                const clientData = clients.find(c => c?.id === data?.client.id)
                clientData && setClient(() => ({
                    id: clientData.id,
                    name: clientData.name
                }))
            }
        }
        // eslint-disable-next-line
    }, [id])

    // Client
    const afterCreation = (res) => {
        // mutates swr cache
        setClient(res.clientList)
        // takes new user id for reserv form
        setClient(() => ({ id: res.newClient.id, name: res.newClient.name }))
    }

    // Reserv
    const afterValidate = (reserv) => {
        if (!client.id) return

        const data = {
            client: client.id,
            ...reserv
        }
        setPreview(() => data)
    }

    const handleSubmit = async () => {
        const fetcher = id ? updateReserv : createReserv

        const res = await fetcher(preview, id)
        console.log(res)
        setErrors(() => res?.errors)

        if (!res.errors) {
            // mutates reservations cache
            setReservations(res.reservationsList)
            navigate('/reservations')
        }
    }

    // const back = () => {
    //     if (preview) setPreview(false)
    //     else setClient(false)
    // }

    const handleEditClient = (e) => {
        console.log('edit');

    }

    return (
        <div className='reserv-container'>
            <h1>Registrar reserva</h1>

            <section>
                <p>Cliente</p>
                <PreReservForm setClient={setClient} handler={createSubmit} cb={afterCreation} />
            </section>

            {client &&
                <section>
                    <p>Resumen de cliente</p>

                    <div className='pt-2'>
                        <p className='txt-n-icon ml-2 font-semibold text-gray-500 dark:text-gray-400'>{client?.name}</p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdEmail />{client?.email || '-'}
                        </p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdCall />{client?.telephone || '-'}
                        </p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdPlace />{client?.nationality || '-'}
                        </p>
                        <p className='txt-n-icon ml-2 text-gray-500 dark:text-gray-400'>
                            <MdDirectionsCar />{client?.vehicle || '-'}
                        </p>
                    </div>

                    <button className='btn-icon absolute top-6 right-9' onClick={handleEditClient}>
                        <MdEdit />
                    </button>

                </section>}

            <section>
                <p>Reserva</p>
                <ReservForm handler={validateValues} cb={afterValidate} edit={editData} />
            </section>

            <section>

            </section>


            {/* <div className={preview ? 'hidden' : ''}>
                {!client && <PreReservForm setClient={setClient} handler={createSubmit} cb={afterCreation} />}

                {client && <h2>(02/03) Datos de la reserva</h2>}
                {client && <p>Cliente: <b>{client.name}</b> (cambiar) (editar)</p>}
                {client && <ReservForm handler={validateValues} cb={afterValidate} edit={editData} />}
            </div>

            {preview && <>
                {preview && <h2>(03/03) Confirmar datos</h2>}
                <ReservPreview preview={preview} client={client.name} cabin={cabins.find(c => c.id === preview.cabin).name} handler={handleSubmit} />
            </>} */}

            {errors?.someError && <p>error: {errors.someError}</p>}
            {/* {client && <button onClick={back} className='btn-tertiary'>volver</button>} */}
        </div>
    )
}

export default CreateReservation