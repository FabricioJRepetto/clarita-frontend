import { numberToCurrency } from '@/utils/formUtils';
import React from 'react'

const Details = ({ details }) => {
    console.log(details);

    const aux = Object.entries(details)

    return (
        <div className='grid grid-cols-2 mt-2'>
            {aux.map(d =>
                <>
                    <p key={d[0]} className='text-gray-400'>{d[0]}:</p>
                    <p key={d[0] + "B"} className='text-gray-300'>{numberToCurrency(d[1])}</p>
                </>
            )}
            {aux.map(d =>
                <>
                    <p key={d[0]} className='text-gray-400'>{d[0]}:</p>
                    <p key={d[0] + "B"} className='text-gray-300'>{numberToCurrency(d[1])}</p>
                </>
            )}
        </div>
    )
}

export default Details