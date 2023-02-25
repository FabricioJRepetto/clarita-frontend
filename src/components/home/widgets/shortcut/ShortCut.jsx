import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShortCut = ({ title, to, icon }) => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-24 flex justify-center items-center cursor-pointer hover:brightness-125 rounded-lg overflow-clip'
            onClick={() => navigate(to)}>

            <p className='txt-n-icon text-2xl font-medium dark:short-cut'>
                {icon && icon}{title}
            </p>
        </div>
    )
}

export default ShortCut