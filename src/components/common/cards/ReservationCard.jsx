import { fancyDate } from '@/utils/formatDate'
import React, { useState } from 'react'
import ClientDetailsCard from './ClientDetailsCard'
import { MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ReservationCard = ({ data }) => {
    const [clientDetails, setClientDetails] = useState(false)
    const navigate = useNavigate()

    const toggleClient = () => {
        setClientDetails(!clientDetails)
    }

    return (
        <div className='grid gap-4'>
            <section className='p-4 rounded-lg bg-slate-100 dark:bg-slate-700'>
                {clientDetails
                    ? <div>
                        <p className='cursor-pointer flex items-center' onClick={toggleClient}><MdPerson className='mr-2' /> Cliente (menos detalles)</p>
                        <ClientDetailsCard user={data?.client} />
                    </div>
                    : <div className='cursor-pointer' onClick={toggleClient}>
                        <p className='flex items-center'><MdPerson className='mr-2' />Cliente (más detalles)</p>
                    </div>}
            </section>

            <section>
                {data?.cabin.name &&
                    <p onClick={() => navigate(`/cabins/details/${data.cabin.id}`)} className='cursor-pointer'>
                        Cabaña: <b>{data?.cabin?.name || '?'}
                        </b> (ir a cacbaña)
                    </p>}
                <p>Fechas:</p>
                <p className='mx-2'>checkin: <b>{fancyDate(data?.checkin)}</b></p>
                <p className='mx-2'>checkout: <b>{fancyDate(data?.checkout)}</b></p>
            </section>

            <section>
                <p>Personas: <b>{data?.persons}</b></p>
                <p>Vehículo: <b>{data?.client?.vehicleType || 'No'}</b></p>
                {data?.client?.plate !== '-' && <p className='mx-2'>Patente: <b>{data?.client?.plate}</b></p>}
            </section>

            <section>
                <p>Pago: <b>{data?.paymentType} - ${data?.amount}</b></p>
                {data?.fees !== '-' && <p>Cuotas: <b>{data?.fees}</b></p>}
                {data?.percentage !== '-' && <p>Seña: <b>{data?.percentage}</b></p>}
            </section>

            <section>
                <p>Notas: {data?.notes}</p>
            </section>

            <section>
                <i className='text-xs opacity-75 mx-2'>ID: {data?.id}</i>
            </section>
        </div>
    )
}

export default ReservationCard