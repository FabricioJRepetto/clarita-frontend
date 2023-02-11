import { useNavigate } from 'react-router-dom'
import React from 'react'
import { MdEmail, MdCall } from 'react-icons/md';

const ClientMiniCard = ({ data }) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/clients/details/${data.id}`)}
            className='px-3 py-2 my-1 border rounded-lg border-slate-300 dark:border-slate-700 cursor-pointer'>
            <p className='text-xl mb-1'>{data.name}</p>
            <p className='flex gap-2 items-center ml-2 text-gray-500 dark:text-gray-400'><MdCall />{data?.telephone || '-'}</p>
            <p className='flex gap-2 items-center ml-2 text-gray-500 dark:text-gray-400'><MdEmail />{data?.email || '-'}</p>
        </div>
    )
}

export default ClientMiniCard