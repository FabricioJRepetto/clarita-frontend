import useCurrentPath from '@/hooks/useCurrentPath';
import useUser from '@/hooks/useUser';
import React from 'react'
import { MdPerson, MdPermIdentity, MdToday, MdOutlineToday, MdHome, MdAttachMoney, MdMonetizationOn, MdOutlineLocalPolice, MdLocalPolice, MdOutlineHome, MdOutlineHolidayVillage, MdHolidayVillage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

const NavList = () => {
    const navigate = useNavigate()
    const { admin } = useUser()
    const path = useCurrentPath()

    return (
        <ul className='navList'>
            <li onClick={() => navigate('/')}
                className={`${path === '/' ? 'text-blue-500' : 'text-gray-400'}`}>
                {path === '/'
                    ? <MdHome className='text-blue-500' />
                    : <MdOutlineHome className='text-gray-400' />}
                Home
            </li>

            <li onClick={() => navigate('/clients')}
                className={`${path.includes('/clients') ? 'text-blue-500' : 'text-gray-400'}`}>
                {path.includes('/clients')
                    ? <MdPerson className='text-blue-500' />
                    : <MdPermIdentity className='text-gray-400' />}
                Clientes
            </li>

            <li onClick={() => navigate('/reservations')}
                className={`${path.includes('/reservations') ? 'text-blue-500' : 'text-gray-400'}`}>
                {path.includes('/reservations')
                    ? <MdToday className='text-blue-500' />
                    : <MdOutlineToday className='text-gray-400' />}
                Reservas
            </li>

            <li onClick={() => navigate('/cabins')}
                className={`${path.includes('/cabins') ? 'text-blue-500' : 'text-gray-400'}`}>
                {path.includes('/cabins')
                    ? <MdHolidayVillage className='text-blue-500' />
                    : <MdOutlineHolidayVillage className='text-gray-400' />}
                Cabañas
            </li>

            <li className={`pointer-events-none text-gray-400 ${path === '' ? '' : ''}`}>
                {path === ''
                    ? <MdMonetizationOn className='text-blue-500' />
                    : <MdAttachMoney className='text-gray-400' />}
                Cuentas
            </li>

            {admin && <li onClick={() => navigate('/admin')}
                className={`${path.includes('/admin') ? 'text-orange-500' : 'text-gray-400'}`}>
                {path.includes('/admin')
                    ? <MdLocalPolice className='text-orange-500' />
                    : <MdOutlineLocalPolice className='text-gray-400' />}
                Admin
            </li>}
        </ul>
    )
}

export default NavList