import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShortCut = ({ title, to }) => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-24 flex justify-center items-center cursor-pointer hover:brightness-125 rounded-lg overflow-clip'
            onClick={() => navigate(to)}>

            <p className='text-2xl font-medium dark:short-cut'>
                {title}
            </p>
        </div>
    )
}

export default ShortCut