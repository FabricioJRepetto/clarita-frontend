import React from 'react'
import { toggleTheme } from '@/utils/toggleTheme'
import { useSWRConfig } from 'swr';
import { deleteCookie } from '@/utils/cookies';
import useUser from '@/hooks/useUser';

const Navbar = () => {
    //: TODO: create a different hook for user and login
    const { user, isLoading, error, setUser } = useUser()
    const { mutate } = useSWRConfig()

    const handleLogout = async () => {
        await deleteCookie('userToken')
        setUser(false)
        // mutate('/user/login', false)
        console.log('handleLogout', user);
    }

    return (
        <header className={`w-screen h-16 px-4 fixed top-0 left-0 flex justify-between items-center border-b-2  border-b-lime-500`}>
            <h3>Cabañas Clarita</h3>

            <div className='flex gap-4'>
                <p onClick={handleLogout}>👨‍🦰 {user?.user_name || 'user'}</p>
                <button onClick={toggleTheme}>💡</button>
            </div>
        </header>
    )
}

export default Navbar