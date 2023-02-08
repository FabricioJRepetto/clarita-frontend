import React from 'react'

const ClientDetailsCard = ({ user }) => {
    return (
        <div className='grid gap-4'>
            <section>
                <p><b>{user?.name || '-'}</b></p>
                <i className='text-xs opacity-75 mx-2'>ID: {user.id || '-'}</i>
            </section>

            <section>
                <p>DNI: <b>{user?.dni || '-'}</b></p>
                <p>Teléfono: <b>{user?.telephone || '-'}</b></p>
                <p>Edad: <b>{user?.age || '-'}</b></p>
                <p>Profesión: <b>{user?.profession || '-'}</b></p>
                <p>Estado civil: <b>{user?.civil_status || '-'}</b></p>
            </section>

            <section>
                <p>Nacionalidad: <b>{user?.nationality || '-'}</b></p>
                <p>Procedencia: <b>{user?.provenance || '-'}</b></p>
                <p>Dirección: <b>{user?.address || '-'}</b></p>
            </section>

            <section>
                <p>Vehículo: <b>{user?.vehicleType || '-'}</b></p>
                <p>Patente: <b>{user?.plate || '-'}</b></p>
            </section>

            <section>
                <p>Notas: <b>{user?.notes || '-'}</b></p>
            </section>
        </div>
    )
}

export default ClientDetailsCard