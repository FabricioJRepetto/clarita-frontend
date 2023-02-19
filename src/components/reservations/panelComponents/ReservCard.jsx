import Flag from '@/components/common/Flag';
import NoPayment from '@/components/common/NoPayment';
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
        country_code,
        paymentStatus
    } = data
    const [expand, setExpand] = useState(false)

    const goToReserv = (e) => {
        e.stopPropagation()
        navigate(`/reservations/details/${id}`)
        return null
    }

    return (
        <div onClick={goToReserv}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
            style={{ width: `${(nights < 2 && expand) ? 14 : (nights * 7)}rem` }}
            className={`h-10 z-10 flex justify-start items-center absolute top-1 ${checkin === 'pre' ? 'left-0 rounded-r-3xl' : 'left-14 rounded-3xl '}  bg-blue-600 text-white cursor-pointer hover:brightness-125`}>

            <span className={`h-10 w-12 flex gap-1 absolute left-0 justify-center items-center ${checkin === 'pre' ? 'rounded-r-3xl' : 'rounded-3xl'} bg-blue-700`}><MdPeople />{pax}</span>

            <span className={`flex items-center h-5 ${expand ? 'w-10 px-2 mx-0 mr-2 opacity-100' : 'w-0 px-0 opacity-0'} ml-14  overflow-hidden bg-rose-600 rounded-lg transition-all text-white`}>ver</span>

            {paymentStatus === false && <NoPayment />}

            <p className='txt-n-icon ellipsis pl-2'>
                <Flag code={country_code} />
                {name}
            </p>
        </div>
    )
}

export default ReservCard