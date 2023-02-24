import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShortCut = ({ title, to }) => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-24 flex justify-center items-center cursor-pointer bg-gradient-to-br from-slate-700/30 to-transparent hover:brightness-125 rounded-lg overflow-clip'
            onClick={() => navigate(to)}>

            <p className='text-2xl font-bold'>
                {title}
            </p>
        </div>
    )
}

export default ShortCut