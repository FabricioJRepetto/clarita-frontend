import React, { useState } from 'react'
import { MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ReservCard = ({ data }) => {
    const navigate = useNavigate()
    const {
        id,
        nights,
        pax,
        name,
        checkin,
        nationality,
    } = data
    const [expand, setExpand] = useState(false)

    return (
        <div onClick={() => navigate(`/reservations/details/${id}`)}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
            style={{ width: `${(nights < 2 && expand) ? 14 : (nights * 7)}rem` }}
            className={`h-10 z-10 flex justify-start items-center absolute top-1 ${checkin === 'pre' ? 'left-0 rounded-r-3xl' : 'left-14 rounded-3xl '}  bg-blue-600 text-white cursor-pointer hover:brightness-125`}>

            <span className={`h-10 w-12 flex gap-1 absolute left-0 justify-center items-center ${checkin === 'pre' ? 'rounded-r-3xl' : 'rounded-3xl'} bg-blue-700`}><MdPeople />{pax}</span>

            <span className={`flex items-center h-5 ${expand ? 'w-10 px-2 mx-0 opacity-100' : 'w-0 px-0 opacity-0'} ml-14  overflow-hidden bg-rose-500 rounded-lg transition-all text-white`}>ver</span>

            <p className='ellipsis pl-2'>{name}</p>
        </div>
    )
}

export default ReservCard