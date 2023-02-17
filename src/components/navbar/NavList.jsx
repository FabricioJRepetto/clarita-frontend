import useCurrentPath from '@/hooks/useCurrentPath';
import useUser from '@/hooks/useUser';
import React from 'react'
import { MdPerson, MdOutlineToday, MdHome, MdAttachMoney, MdOutlineLocalPolice, MdOutlineHome, MdOutlineHolidayVillage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

const NavList = () => {
    const navigate = useNavigate()
    const { admin } = useUser()
    const path = useCurrentPath()

    return (
        <ul className='navList'>
            <li onClick={() => navigate('/')}
                className={`${path === '/' ? 'text-blue-500' : ''}`}>
                <MdHome className={`${path === '/' ? 'text-blue-500' : 'text-gray-500'}`} />
                Home
            </li>

            <li onClick={() => navigate('/clients')}
                className={`${path === '/clients' ? 'text-blue-500' : ''}`}>
                <MdPerson className={`${path === '/clients' ? 'text-blue-500' : 'text-gray-500'}`} />
                Clientes
            </li>

            <li onClick={() => navigate('/reservations')}
                className={`${path === '/reservations' ? 'text-blue-500' : ''}`}>
                <MdOutlineToday className={`${path === '/reservations' ? 'text-blue-500' : 'text-gray-500'}`} />
                Reservas
            </li>

            <li onClick={() => navigate('/cabins')}
                className={`${path === '/cabins' ? 'text-blue-500' : ''}`}>
                <MdOutlineHolidayVillage className={`${path === '/cabins' ? 'text-blue-500' : 'text-gray-500'}`} />
                Cabañas
            </li>

            <li className={`${path === '' ? '' : ''}`}>
                <MdAttachMoney className={`${path === '/counts' ? 'text-blue-500' : 'text-gray-500'}`} />
                Cuentas
            </li>

            {admin && <li onClick={() => navigate('/admin')}
                className={`${path === '/admin' ? 'text-blue-500' : ''}`}>
                <MdOutlineLocalPolice className={`${path === '/admin' ? 'text-blue-500' : 'text-gray-500'}`} />
                Admin
            </li>}
        </ul>
    )
}

export default NavList