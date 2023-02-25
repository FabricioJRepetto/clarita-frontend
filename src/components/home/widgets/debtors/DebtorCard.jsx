import Flag from '@/components/common/misc/Flag';
import React, { useState } from 'react'
import { MdHome, MdPerson, MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const DebtorCard = ({ data, openModal }) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const openMenu = (e) => {
        e.stopPropagation()
        setOpen(() => true)
    }

    const goReserv = () =>
        navigate(`/reservations/details/${data?.id}`)

    const goClient = () =>
        navigate(`/clients/details/${data?.client?.id}`)

    const payment = () =>
        openModal(data)

    return (
        <div className='relative w-full px-4 py-2 border border-slate-700 rounded-md fade-in' onClick={() => setOpen(false)}>

            <p className='txt-n-icon capitalize'><MdPerson /> <Flag code={data?.client?.country_code} /> {data?.client?.name || '?'}</p>
            <p className='txt-n-icon text-gray-400 capitalize'><MdHome /> {data?.cabin?.name || '?'}</p>

            <button className='btn-icon z-10 absolute right-3 top-3' onClick={openMenu}><MdMoreVert /></button>

            {open &&
                <section className='absolute z-20 -right-2 top-2 w-fit h-fit py-2 border border-slate-400 dark:border-slate-700 rounded-md bg-neutral-100 dark:bg-slate-900'>
                    <p onClick={goReserv}
                        className='cursor-pointer px-4 py-1 w-full hover:bg-gray-300 hover:dark:bg-slate-800'>
                        ver reserva
                    </p>

                    <p onClick={goClient}
                        className='cursor-pointer px-4 py-1 w-full hover:bg-gray-300 hover:dark:bg-slate-800'>
                        ver cliente
                    </p>

                    <p onClick={payment}
                        className='cursor-pointer px-4 py-1 w-full hover:bg-gray-300 hover:dark:bg-slate-800'>
                        agregar pago
                    </p>

                </section>}
        </div>
    )
}

export default DebtorCard