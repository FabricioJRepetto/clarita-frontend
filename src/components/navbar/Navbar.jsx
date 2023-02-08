import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';
import { toggleTheme } from '@/utils/toggleTheme'
import { deleteCookie } from '@/utils/cookies';
import useUser from '@/hooks/useUser';

const Navbar = () => {
    const { user, isLoading, error, setUser } = useUser()
    const { mutate } = useSWRConfig()
    const navigate = useNavigate()

    const handleLogout = () => {
        deleteCookie('userToken')
        setUser(false)
        // mutate('/user/login', false)
        console.log('handleLogout', user);
    }

    return (
        <header className={`w-screen h-16 px-8 py-4 fixed top-0 left-0 flex justify-between items-center backdrop-blur-lg backdrop-grayscale bg-orange-50/90 dark:bg-slate-900/75`}>
            <h2 onClick={() => navigate('/')} className='cursor-pointer'>Cabañas Clarita</h2>

            <div className='flex gap-4'>
                <button onClick={handleLogout}>👤 {user?.user_name || 'user'}</button>
                <button onClick={toggleTheme}>💡</button>
            </div>
        </header>
    )
}

export default Navbar