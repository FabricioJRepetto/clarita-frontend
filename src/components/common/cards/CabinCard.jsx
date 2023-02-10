import { formatDate } from '@/utils/formatDate'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CabinCard = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/cabins/details/${data.id}`)} className='h-32 p-2 relative cursor-pointer border border-slate-300 dark:border-slate-700 rounded-lg'>
            <b className='text-lg'>{data.name}</b>
            {data?.current_guest
                ? <>
                    <p>Huesped actual</p>
                    <p>{data?.current_guest?.client?.name}</p>
                    <p>{formatDate(data.current_guest.checkin)} - {formatDate(data.current_guest.checkout)}</p>
                </>
                : <p>libre</p>}
            <div className={`h-3 w-3 rounded-full absolute top-3 right-3 ${data?.current_guest ? 'bg-rose-400 dark:bg-rose-700' : 'bg-green-400 dark:bg-green-300'}`}></div>
        </div>
    )
}

export default CabinCard