import useUser from '@/hooks/useUser';
import React from 'react'
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NavMenu = ({ visible, logout }) => {
    const navigate = useNavigate()
    const { admin } = useUser()

    const goAdmin = () => navigate('/admin')
    const goProfile = () => navigate('/user')

    return (
        <div className={`navMenu ${visible ? 'navMenuOn' : ''}`}>
            <p onClick={goProfile}>Perfil</p>
            {admin && <p onClick={goAdmin}>admin</p>}

            <p onClick={logout}>Log out <MdLogout /></p>
        </div>
    )
}

export default NavMenu