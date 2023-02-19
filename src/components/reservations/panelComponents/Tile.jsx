import React, { useEffect, useState } from 'react'

const Tile = ({ mode, disabled = false, cb, side }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        !mode && setActive(() => false)
    }, [mode])

    const hover = () => {
        setActive(() => true)
        cb()
    }

    return (
        < div onMouseEnter={mode ? hover : null} onMouseDown={() => setActive(() => true)}
            className={`h-full w-1/2 ${active ? 'bg-orange-500' : 'hover:bg-slate-500/20'} ${disabled ? 'pointer-events-none' : ''}`}></div>
    )
}

export default Tile