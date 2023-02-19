import React from 'react'
import Flag from '@/components/common/Flag';
import { MdEmail, MdCall, MdAccountBox, MdDirectionsCar, MdPlace, MdStickyNote2 } from 'react-icons/md';

const ClientDetailsCard = ({ user }) => {
    return (
        <div className='details-card'>
            <section>
                <p><b className='text-2xl'>{user?.name || '-'}</b></p>
                <i className='text-xs text-gray-500 mx-2'>ID: {user.id || '-'}</i>
                <p className='flex gap-2 items-center'><MdCall /><b>{user?.telephone || '-'}</b></p>
                <p className='flex gap-2 items-center'><MdEmail /><b>{user?.email ? <a href={`mailto:${user?.email}`}>{user?.email}</a> : '-'}</b></p>
            </section>

            <section>
                <p className='text-xl flex gap-2 items-center'><MdAccountBox />Datos</p>
                <div className='details-data'>
                    <p>DNI</p>
                    <p>{user?.dni || '-'}</p>
                    <p>Edad </p>
                    <p>{user?.age || '-'}</p>
                    <p>Profesión</p>
                    <p>{user?.profession || '-'}</p>
                    <p>Estado civil</p>
                    <p>{user?.civil_status || '-'}</p>
                </div>
            </section>

            <section>
                <p className='text-xl flex gap-2 items-center'><MdPlace />Origen </p>
                <div className='details-data'>
                    <p>Nacionalidad </p>
                    <p className='txt-n-icon'>{user?.nationality || '-'}<Flag code={user?.country_code} /></p>
                    <p>procedencia </p>
                    <p>{user?.provenance || '-'}</p>
                    <p>dirección </p>
                    <p>{user?.address || '-'}</p>
                </div>
            </section>

            <section>
                <p className='text-xl flex gap-2 items-center'><MdDirectionsCar />Vehículo</p>
                <div className='details-data'>
                    <p>Patente</p>
                    <p>{user?.plate || '-'}</p>
                    <p>Tipo</p>
                    <p>{user?.vehicleType || '-'}</p>
                </div>
            </section>

            <section>
                <p className='text-xl flex gap-2 items-center'><MdStickyNote2 />Notas</p>
                <p className='ml-2'>{user?.notes || '-'}</p>
            </section>
        </div>
    )
}

export default ClientDetailsCard