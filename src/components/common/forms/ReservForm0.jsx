import useClients from '@/hooks/useClients'
import { fuzzySearch } from '@/utils/fuzzySearch'
import React, { useState } from 'react'
import ClientForm from './ClientForm'

const ReservForm0 = ({ setClient, handler, cb }) => {
    const [newClient, setNewClient] = useState(false)
    const [filtered, setFiltered] = useState(false)
    const { clients } = useClients()

    const filter = (keys, pattern) => {
        if (pattern) {
            const newList = fuzzySearch(clients, [keys || 'name'], pattern)
            setFiltered(() => newList)
        } else setFiltered(() => false)
    }

    const selectClient = (client) => {
        const aux = {
            id: client.id,
            name: client.name
        }
        setClient(() => aux)
    }

    //: TODO: Refact search input
    return (
        <div>
            <h2>#01</h2>
            <button onClick={() => setNewClient(!newClient)} className='btn-primary'>Nuevo Cliente</button>
            <br />
            {newClient && <ClientForm handler={handler} cb={cb} />}
            <br />
            {!newClient &&
                <>
                    <input type="text" onChange={(e) => filter('name', e.target.value)} />
                    <section>
                        {filtered && filtered.map(c => (
                            <p key={c.id} onClick={() => selectClient(c)}><b>{c.name}</b> <i className='opacity-75'>dni: {c.dni}</i></p>
                        ))}
                    </section>
                </>}
        </div>
    )
}

export default ReservForm0