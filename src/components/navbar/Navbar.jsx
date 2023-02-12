import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '@/utils/toggleTheme'
import { deleteCookie } from '@/utils/cookies';
import useUser from '@/hooks/useUser';
import { MdLightMode, MdDarkMode, MdAccountCircle } from 'react-icons/md';

const Navbar = () => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    const [theme, setTheme] = useState()

    useEffect(() => {
        if (localStorage.theme === 'light') setTheme(true)
        else setTheme(false)
    }, [])

    const handleLogout = () => {
        deleteCookie('userToken')
        setUser(false)
    }
    const handleToggle = () => {
        toggleTheme()
        setTheme(!theme)
    }

    return (
        <header className={`w-screen h-16 px-8 py-4 fixed top-0 left-0 flex justify-between items-center backdrop-blur-lg backdrop-grayscale text-black dark:text-white bg-orange-50/90 dark:bg-slate-900/75 z-50`}>
            <h2 onClick={() => navigate('/')} className='cursor-pointer logo-font text-2xl'>Cabañas Clarita</h2>

            <div className='flex gap-6'>
                <button onClick={handleLogout} className='flex justify-center items-center'><MdAccountCircle className='mr-2' /> {user?.user_name || 'user'}</button>
                <button onClick={handleToggle}>{theme ? <MdDarkMode /> : <MdLightMode />}</button>
            </div>
        </header>
    )
}

export default Navbar