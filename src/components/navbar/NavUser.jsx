import useUser from '@/hooks/useUser';
import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NavMenu from './NavMenu';
import { mutate } from 'swr';
import { deleteCookie, getCookie } from '@/utils/cookies';

const NavUser = () => {
    const [profileMenu, setProfileMenu] = useState(false)
    const { user } = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
        mutate(['/user/login', getCookie('userToken')], false)
        deleteCookie('userToken')
    }

    return (
        <div onMouseEnter={() => setProfileMenu(true)}
            onMouseLeave={() => setProfileMenu(false)}
            className='flex items-center relative w-full h-4 px-1 cursor-pointer'>
            <MdAccountCircle className='absolute left-1 top-0' />
            <p className='ellipsis pl-6 capitalize'>{user?.user_name.split(' ')[0] || 'Usuario'}</p>
            <NavMenu visible={profileMenu} logout={handleLogout} />
        </div>
    )
}

export default NavUser