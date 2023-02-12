import React, { useState } from 'react'
import ClientList from '@/components/clients/ClientList'
import useClients from '@/hooks/useClients'
import { useNavigate } from 'react-router-dom'
import { fuzzySearch } from '@/utils/fuzzySearch'
import SearchInput from '../common/SearchInput'

const Clients = () => {
    const navigate = useNavigate()
    const { clients, isLoading } = useClients()
    const [filtered, setFiltered] = useState(false)
    const [sortKey, setSortKey] = useState('name')

    const filter = (key, pattern) => {
        setSortKey(() => key)
        if (pattern) {
            const newList = fuzzySearch(clients, [key], pattern)
            setFiltered(() => newList)
        } else setFiltered(() => false)
    }

    return (
        <>
            <section className='mb-4 flex flex-col md:flex-row justify-between'>
                <h1>Clientes</h1>
                <button className='btn-primary' onClick={() => navigate('/clients/create')}>Registrar nuevo</button>
            </section>

            <SearchInput filter={filter} />

            {isLoading && <p>Cargando...</p>}
            <ClientList data={filtered || clients} sortKey={sortKey} />
        </>
    )
}

export default Clients