import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useClients from '@/hooks/useClients'
import useCabins from '@/hooks/useCabins'
import useReservations from '@/hooks/useReservations'
import PreReservForm from '@/components/common/forms/PreReservForm'
import ReservationClientPreview from '@/components/common/forms/ReservationClientPreview'
import ReservForm from '@/components/common/forms/ReservForm'
import ReservPreview from '@/components/common/forms/ReservPreview'
import { createSubmit } from '@/utils/clientSubmitHandlers'
import { createReserv, updateReserv, validateValues } from '@/utils/reservSubmitHandlers'

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
                    name: clientData.name,
                    email: clientData.email,
                    telephone: clientData.telephone,
                    vehicleType: clientData.vehicleType,
                    nationality: clientData.nationality
                }))
            } else console.error('# Reservation not found');
        }
        // eslint-disable-next-line
    }, [id])

    // Client
    const afterCreation = (res) => {
        // mutates swr cache
        setClients(res.clientList)
        // takes new user id for reserv form
        setClient(() => ({
            id: res.newClient.id,
            name: res.newClient.name,
            email: res.newClient.email,
            telephone: res.newClient.telephone,
            vehicleType: res.newClient.vehicleType,
            nationality: res.newClient.nationality
        }))
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

    return (
        <div className='reserv-container'>
            <h1>Registrar reserva</h1>

            <section>
                <p>Huesped</p>
                <PreReservForm setClient={setClient} handler={createSubmit} cb={afterCreation} />
            </section>

            {client &&
                <section>
                    <ReservationClientPreview client={client} cb={afterCreation} />
                </section>}

            <section className={preview ? 'hidden' : ''}>
                <p>Reserva</p>
                <ReservForm handler={validateValues} cb={afterValidate} edit={editData} />
            </section>

            {preview &&
                <section>
                    <p>Resumen</p>
                    <ReservPreview preview={preview} back={() => setPreview(() => false)} client={client.name} cabin={cabins.find(c => c.id === preview.cabin).name} handler={handleSubmit} />
                </section>}

            {errors?.someError && <p>error: {errors.someError}</p>}
        </div>
    )
}

export default CreateReservation