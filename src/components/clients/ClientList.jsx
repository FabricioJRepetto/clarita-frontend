import React from 'react'

const ClientList = ({ data }) => {
    return (
        <div>
            {data.map(e => (
                <div key={e.id} className='p-2 my-1 border border-slate-300 dark:border-slate-700 rounded-lg'>
                    <p>Nombre y apellido: {e?.name || '-'}</p>
                    <p>Teléfono: {e?.telephone || '-'}</p>
                    <br />
                    <p>DNI: {e?.dni || '-'}</p>
                    <p>Edad: {e?.age || '-'}</p>
                    <p>Profesión: {e?.profession || '-'}</p>
                    <p>Estado civil: {e?.civil_status || '-'}</p>
                    <br />
                    <p>Nacionalidad: {e?.nationality || '-'}</p>
                    <p>Procedencia: {e?.provenance || '-'}</p>
                    <p>Dirección: {e?.address || '-'}</p>
                    <br />
                    <p>Vehículo: {e?.vehicleType || '-'}</p>
                    <p>Patente: {e?.plate || '-'}</p>
                    <br />
                    <p>Notas: {e?.notes || '-'}</p>
                    <br />
                    <i>ID: {e.id || '-'}</i>
                    <br />
                    <button className='px-2 mx-4'>editar</button>
                    <button className='px-2 mx-4'>borrar</button>
                </div>
            ))}
        </div>
    )
}

export default ClientList