import React from 'react'
import { useGlobal } from '../../globalContext'
import { toggleTheme } from '../../utils/toggleTheme'

const Navbar = () => {
    const { state: { session, g_loading } } = useGlobal()
    return (
        <header className={`w-screen h-16 px-4 mb-24 fixed ${(session && !g_loading) ? 'flex' : 'hidden'} justify-between items-center border-b-2  border-b-lime-500`}>
            <h3>Cabañas Clarita</h3>

            <div className='flex gap-4'>
                <p>session {String(session)}</p>
                <button onClick={toggleTheme}>theme</button>
            </div>
        </header>
    )
}

export default Navbar