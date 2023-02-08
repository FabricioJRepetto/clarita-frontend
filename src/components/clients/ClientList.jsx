import React from 'react'
import { useNavigate } from 'react-router-dom'

const ClientList = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div>
            {data.map(e => (
                <div key={e.id} className='p-2 my-1 border border-slate-300 dark:border-slate-700 rounded-lg'>
                    <p>Nombre y apellido: {e?.name || '-'}</p>
                    <p>Teléfono: {e?.telephone || '-'}</p>
                    <p>DNI: {e?.dni || '-'}</p>
                    <i>ID: {e.id || '-'}</i>
                    <br />
                    <button className='btn-primary px-2 mx-4' onClick={() => navigate(`/clients/details/${e.id}`)}>ver</button>
                </div>
            ))}
        </div>
    )
}

export default ClientList