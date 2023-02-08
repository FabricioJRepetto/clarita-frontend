import React, { useState } from 'react'
import ReservForm0 from '../common/forms/ReservForm0'
import { createSubmit } from '@/utils/clientSubmitHandlers'
import useClients from '@/hooks/useClients'
import ReservForm from '../common/forms/ReservForm'

const CreateReservation = () => {
    const [client, setClient] = useState(false)
    const { setClients } = useClients()

    const afterCreation = (res) => {
        // mutates swr cache
        setClients(res.clientList)
        // takes new user id for reserv. creation
        setClient(() => ({ id: res.newClient.id, name: res.newClient.name }))
    }

    const handleSubmit = () => {
        console.log();
    }

    const back = () => {
        setClient(false)
    }

    return (
        <div>
            <h1>Registrar reserva</h1>

            {!client && <ReservForm0 setClient={setClient} handler={createSubmit} cb={afterCreation} />}

            {client && <p>Cliente: <b>{client.name}</b></p>}
            {client && <ReservForm />}

            {client && <button onClick={back} className='btn-primary'>volver</button>}
            {client && <button onClick={handleSubmit} className='btn-primary'>Crear Reserva</button>}
        </div>
    )
}

export default CreateReservation