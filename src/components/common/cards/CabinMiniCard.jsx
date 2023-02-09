import React from 'react'
import { useNavigate } from 'react-router-dom'

const CabinMiniCard = ({ data }) => {
    const navigate = useNavigate()
    const miniName = data.name.slice(-1)
    const guest = data.current_guest

    return (
        <div onClick={() => navigate(`/cabins/details/${data.id}`)} className='h-16 aspect-square relative flex justify-center items-center border border-slate-300 dark:border-slate-700 rounded-lg text-3xl cursor-pointer'>
            <b className='mb-2'>{miniName}</b>
            <div className={`h-2 w-2 rounded-full absolute bottom-2 center ${guest ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
        </div>
    )
}

export default CabinMiniCard