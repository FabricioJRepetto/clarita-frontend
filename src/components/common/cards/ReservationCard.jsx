import { fancyDate } from '@/utils/formatDate'
import React, { useState } from 'react'
import ClientDetailsCard from './ClientDetailsCard'
import { MdPerson, MdOutlinePayments, MdHome, MdEvent, MdOutlineInfo, MdStickyNote2, MdOutlineArrowBackIos, MdOpenInNew } from 'react-icons/md';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
import { numberToCurrency } from '@/utils/formUtils';

const ReservationCard = ({ data }) => {
    const [clientDetails, setClientDetails] = useState(false)
    const navigate = useNavigate()

    const toggleClient = () => {
        setClientDetails(!clientDetails)
    }

    return (
        <div className='details-card'>
            <section className='p-4 rounded-lg'>
                <div className='cursor-pointer txt-n-icon justify-between text-xl'
                    onClick={toggleClient}>
                    <p className='txt-n-icon '>
                        <MdPerson className='mr-2' />
                        Cliente
                    </p>
                    <MdOutlineArrowBackIos className={`${clientDetails ? '-rotate-90' : 'rotate-90'} transition-transform`} />
                </div>
                {clientDetails && <ClientDetailsCard user={data?.client} />}
            </section>

            {data?.cabin.name &&
                <section>
                    <p className='txt-n-icon text-xl cursor-pointer hover:border-blue-500'
                        onClick={() => navigate(`/cabins/details/${data.cabin.id}`)} >
                        <MdHome />
                        <b className='capitalize'>{data?.cabin?.name || '-'}</b>
                        <MdOpenInNew className='link' />
                    </p>
                </section>}

            <section>
                <p className='txt-n-icon text-xl'><MdEvent />Fechas</p>
                <div className='details-data'>
                    <p>checkin</p>
                    <p className='txt-n-icon -ml-6'>
                        <BsFillCaretDownFill className='opacity-75 text-rose-400 dark:text-rose-700' />{fancyDate(data?.checkin)}</p>
                    <p>checkout</p>
                    <p className='txt-n-icon -ml-6'>
                        <BsFillCaretUpFill className='opacity-75 text-green-400 dark:text-green-300' />{fancyDate(data?.checkout)}</p>
                    <p>total de noches</p>
                    <p>{data?.nights} {data?.nights > 1 ? 'Noches' : 'Noche'}</p>
                </div>
            </section>

            <section>
                <p className='txt-n-icon text-xl'><MdOutlineInfo />Extra</p>
                <div className='details-data'>
                    <p>Personas</p>
                    <p>{data?.persons}</p>
                    <p>Vehículo</p>
                    <p>{data?.client?.vehicleType === '-' ? 'No' : data?.client?.vehicleType}</p>
                    {data?.client?.plate !== '-' && <><p>Patente</p> <p>{data?.client?.plate}</p></>}
                </div>
            </section>

            <section>
                <p className='txt-n-icon text-xl'><MdOutlinePayments />Pago</p>

                <div className='details-data'>
                    <p>Forma de pago</p> <p>{data?.paymentType}</p>
                    {data?.fees !== '-' && <><p>Cuotas</p> <p>{data?.fees || '-'}</p></>}
                    <p>Monto</p> <p>{numberToCurrency(data?.amount)}</p>
                    {data?.percentage !== '-' && <><p>Seña</p><p>{data?.percentage || '-'}</p></>}
                </div>
            </section>

            {data?.notes !== '-' &&
                <section>
                    <p className='text-xl flex gap-2 items-center'><MdStickyNote2 />Notas</p>
                    <p className='ml-2'>{data?.notes}</p>
                </section>}

            <i className='text-xs text-right opacity-50 mx-2'>ID: {data?.id}</i>

        </div >
    )
}

export default ReservationCard