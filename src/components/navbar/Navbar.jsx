import React from 'react'
import { toggleTheme } from '@/utils/toggleTheme'
import { login } from '@/services/api'
import useSWR from 'swr';

const Navbar = () => {
    //: TODO: create a different hook for user and login
    const { data } = useSWR('/user/login', login)

    return (
        <header className={`w-screen h-16 px-4 fixed top-0 left-0 flex justify-between items-center border-b-2  border-b-lime-500`}>
            <h3>Cabañas Clarita</h3>

            <div className='flex gap-4'>
                <p>👨‍🦰 {data.user_name || 'user'}</p>
                <button onClick={toggleTheme}>💡</button>
            </div>
        </header>
    )
}

export default Navbar