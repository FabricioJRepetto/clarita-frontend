import React, { useState } from 'react'

const Switch = ({ options, cb, state = false }) => {
    const [on, setOn] = useState(state)
    const [A, B] = options
    const C = options.length === 1 && A

    const handler = () => {
        setOn(() => !on)
        cb()
    }

    return (
        <div onClick={handler} className='switch-input cursor-pointer'>
            {!C && <div className='mr-6'>
                <p className={on ? 'font-semibold' : 'text-gray-500'}>{A}</p>
            </div>}

            <div className='w-8 relative mx-1'>
                <div className={`switch-indicator ${on ? 'ml-4' : `-ml-4 ${C ? 'bg-gray-700' : ''}`}`}></div>
                <span></span>
            </div>

            {(!C && B) && <div className='ml-4'>
                <p className={on ? 'text-gray-500' : 'font-semibold'}>{B}</p>
            </div>}
            {C && <div className='ml-4'>
                <p className={on ? 'font-semibold' : 'text-gray-500'}>{C}</p>
            </div>}
        </div>
    )
}

export default Switch