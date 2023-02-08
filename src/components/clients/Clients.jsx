import React, { useState } from 'react'
import ClientList from '@/components/clients/ClientList'
import useClients from '@/hooks/useClients'
import { useNavigate } from 'react-router-dom'
import { fuzzySearch } from '@/utils/fuzzySearch'

const Clients = () => {
    const navigate = useNavigate()
    const { clients, isLoading, error, setClients } = useClients()
    const [filtered, setFiltered] = useState(false)

    const filter = (keys, pattern) => {
        if (pattern) {
            const newList = fuzzySearch(clients, ['name'], pattern)
            setFiltered(() => newList)
        } else setFiltered(() => false)
    }

    //: TODO: Refact search input

    return (
        <div>
            <h1>Clientes</h1>
            <button className='btn-primary' onClick={() => navigate('/clients/create')}>crear</button>
            <br />
            <input type="text" onChange={(e) => filter('', e.target.value)} />
            <button className='btn-primary'>buscar</button>
            <br />
            {isLoading && <p>Cargando...</p>}
            <ClientList data={filtered || clients} />
        </div>
    )
}

export default Clients