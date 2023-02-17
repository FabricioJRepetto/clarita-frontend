import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdPerson, MdEvent, MdHome } from 'react-icons/md';
import { fancyDate } from '@/utils/formatDate';
import { BsFillCaretRightFill } from 'react-icons/bs';

//: TODO: esto no se usa?
export const ReservationList = ({ data }) => {
    const navigate = useNavigate()
    return (
        <>
            {data.map(e => (
                <div key={e.id} onClick={() => navigate(`/reservations/details/${e.id}`)} className='py-2 px-3 my-1 cursor-pointer border border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-400 hover:dark:border-slate-500'>

                    <p className='txt-n-icon text-xl'>
                        <MdEvent />
                        {fancyDate(e.checkin)}
                        <BsFillCaretRightFill className='mx-2 text-gray-500' />
                        {fancyDate(e.checkout)}
                    </p>
                    <section className='px-2 text-gray-500'>
                        <p className='txt-n-icon capitalize'><MdHome />{e?.cabin?.name}</p>
                        <p className='txt-n-icon capitalize'><MdPerson />{e?.client?.name}</p>
                    </section>
                </div>
            ))}
        </>
    )
}
