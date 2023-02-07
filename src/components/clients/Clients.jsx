import React, { useState } from 'react'
import ClientForm from '@/components/common/forms/ClientForm'
import ClientList from '@/components/clients/ClientList'
import useClients from '@/hooks/useClients'

const Clients = () => {
    const [create, setCreate] = useState(false)
    const { clients, isLoading, error, setClient } = useClients()



    return (
        <div>
            <h1>Clientes</h1>
            <button className='btn-primary' onClick={() => setCreate(!create)}>crear</button>
            <button className='btn-primary'>buscar</button>
            {isLoading && <p>Cargando...</p>}
            {!create && <ClientList data={clients} />}
            {create && <ClientForm />}
        </div>
    )
}

export default Clients