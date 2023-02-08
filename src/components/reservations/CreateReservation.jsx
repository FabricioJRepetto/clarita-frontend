import React, { useState } from 'react'
import PreReservForm from '@/components/common/forms/PreReservForm'
import { createSubmit } from '@/utils/clientSubmitHandlers'
import useClients from '@/hooks/useClients'
import ReservForm from '@/components/common/forms/ReservForm'
import { createReserv, validateValues } from '@/utils/reservSubmitHandlers'
import useReservations from '@/hooks/useReservations'
import { useNavigate } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'

const CreateReservation = () => {
    const navigate = useNavigate()
    const { setClients } = useClients()
    const { cabins } = useCabins()
    const [client, setClient] = useState(false)
    const [preview, setPreview] = useState(false)
    const [errors, setErrors] = useState(false)
    const { setReservations } = useReservations()

    // Client
    const afterCreation = (res) => {
        // mutates swr cache
        setClients(res.clientList)
        // takes new user id for reserv. creation
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
        const res = await createReserv(preview)
        console.log(res)
        setErrors(() => res?.errors)

        if (!res.errors) {
            // mutates reservations cache
            setReservations(res.reservationsList)
            navigate('/reservations')
        }
    }

    const back = () => {
        if (preview) setPreview(false)
        else setClient(false)
    }

    return (
        <div>
            <h1>Registrar reserva</h1>

            <div className={preview ? 'hidden' : ''}>
                {!client && <PreReservForm setClient={setClient} handler={createSubmit} cb={afterCreation} />}

                {client && <h2>(02/03) Datos de la reserva</h2>}
                {client && <p>Cliente: <b>{client.name}</b></p>}
                {client && <ReservForm handler={validateValues} cb={afterValidate} />}
            </div>

            {preview && <>
                {preview && <h2>(03/03) Confirmar datos</h2>}

                <p>Cliente: {client.name}</p>
                <p>Fechas: in {preview.checkin} - out {preview.checkout}</p>
                <p>Noches: {preview.nights}</p>
                <p>Cabaña: {cabins.find(c => c.id === preview.cabin).name}</p>
                <p>Personas: {preview.persons}</p>
                <p>Pago/seña: {preview.paymentType} - ${preview.amount}</p>
                <p>Notas: {preview.notes}</p>
                <br />
                <button onClick={handleSubmit} className='btn-primary'>Crear Reserva</button>
            </>}

            {errors?.someError && <p>error: {errors.someError}</p>}
            {client && <button onClick={back} className='btn-primary'>volver</button>}
        </div>
    )
}

export default CreateReservation