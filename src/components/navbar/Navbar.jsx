import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import useUser from '@/hooks/useUser';
import NavList from './NavList';
import SwitchTheme from './SwitchTheme';
import NavUser from './NavUser';

const Navbar = () => {
    const { user } = useUser()
    const navigate = useNavigate()

    return (
        <>
            <nav className={`w-48 h-screen text-lg fixed top-0 left-0 flex flex-col justify-between items-center z-50 ${user?.id ? '' : 'hidden'} border-r border-r-gray-400 dark:border-r-slate-800`}>

                <div className='flex flex-col gap-4 w-full pt-4'>
                    <h2 onClick={() => navigate('/')} className=' mx-auto logo-font'>Cabañas Clarita</h2>
                    <NavList />
                </div>

                <div className='w-full flex flex-col gap-4 items-start pb-6 pl-7'>
                    <NavUser />
                    <SwitchTheme />
                </div>
            </nav>

            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Navbar