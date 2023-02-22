import React, { useState } from 'react'
import useClients from '@/hooks/useClients'
import ClientForm from './ClientForm'
import { fuzzySearch } from '@/utils/fuzzySearch'
import { MdSearch } from 'react-icons/md';

const PreReservForm = ({ setClient, handler, cb }) => {
    const [newClient, setNewClient] = useState(false)
    const [filtered, setFiltered] = useState(false)
    const { clients } = useClients()

    const filter = (keys, pattern) => {
        if (pattern) {
            const newList = fuzzySearch(clients, [keys || 'name'], pattern)
            setFiltered(() => newList)
        } else setFiltered(() => false)
    }

    const newClientHandler = () => {
        setClient(false)
        setNewClient(!newClient)
    }

    const selectClient = (client) => {
        document.getElementById('client-search').value = ''
        setFiltered(() => false)

        const aux = {
            id: client.id,
            name: client.name,
            nationality: client.nationality,
            vehicleType: client.vehicleType,
            telephone: client.telephone,
            email: client.email
        }
        setClient(aux)
    }

    const afterCreation = (res) => {
        setNewClient(() => false)
        cb(res)
    }

    //: TODO: Refact search input
    return (
        <div className='grid grid-cols-4 gap-4 w-96 py-2'>

            <button onClick={newClientHandler}
                className={`${newClient ? 'btn-tertiary' : 'btn-primary'} col-span-4`}>
                {newClient ? 'volver' : 'Nuevo Cliente'}
            </button>

            {newClient && <ClientForm handler={handler} cb={afterCreation} />}

            {!newClient &&
                <section className='relative col-span-4'>

                    <span className='relative w-full'>
                        <MdSearch className='input-icon' />
                        <input autoComplete='off' type="text" placeholder='Buscar' id='client-search' onChange={(e) => filter('name', e.target.value)} className='w-full' />
                    </span>

                    {!!filtered.length &&
                        <div className='h-fit min-w-full absolute top-10 left-0 bg-slate-900 flex flex-col gap-1 p-2 rounded-lg border border-slate-800 z-10'>
                            {filtered.map(c => (
                                <p key={c.id} onClick={() => selectClient(c)} className='cursor-pointer hover:bg-slate-800'><b>{c.name}</b> <i className='opacity-75'>dni: {c.dni}</i></p>
                            ))}
                        </div>}

                </section>}
        </div >
    )
}

export default PreReservForm