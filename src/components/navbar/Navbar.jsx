import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { toggleTheme } from '@/utils/toggleTheme'
import { deleteCookie, getCookie } from '@/utils/cookies';
import useUser from '@/hooks/useUser';
import { MdLightMode, MdDarkMode, MdAccountCircle } from 'react-icons/md';
import { mutate } from 'swr';

const Navbar = () => {
    const { user } = useUser()
    const navigate = useNavigate()
    const [theme, setTheme] = useState()

    useEffect(() => {
        if (localStorage.theme === 'light') setTheme(true)
        else setTheme(false)
    }, [])

    const handleLogout = () => {
        console.warn('- Log out -');
        mutate(['/user/login', getCookie('userToken')], false)
        deleteCookie('userToken')
    }

    const handleToggle = () => {
        toggleTheme()
        setTheme(!theme)
    }

    return (
        <>
            <header className={`w-screen h-16 px-8 py-4 text-lg fixed top-0 left-0 flex justify-between items-center backdrop-blur-lg backdrop-grayscale text-black dark:text-white bg-orange-50/90 dark:bg-slate-900/75 z-50 ${user?.id ? '' : 'hidden'}`}>
                <h2 onClick={() => navigate('/')} className='logo-font'>Cabañas Clarita</h2>

                <div className='flex gap-6'>
                    <button onClick={handleLogout} className='flex justify-center items-center'><MdAccountCircle className='mr-2' /> {user?.user_name || 'user'}</button>
                    <button onClick={handleToggle}>{theme ? <MdDarkMode /> : <MdLightMode />}</button>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Navbar