import React from 'react'
import { approve, deleteUser, email, password, role } from '@/components/admin/adminHandlers';
import { MdVpnKey, MdMilitaryTech, MdEmail, MdGppBad, MdGppGood } from 'react-icons/md';

const UserCard = ({ user }) => {


    return (
        <div key={user?.id} className='p-4 w-full flex justify-between rounded-md border border-slate-800'>
            <section>
                <b className='text-lg capitalize'>{user?.user_name}</b>

                <p className='txt-n-icon cursor-pointer'
                    onClick={() => role(user?.id, 'newRole')}>
                    Rol: {user?.role} <MdMilitaryTech />
                </p>

                <p className='txt-n-icon cursor-pointer'
                    onClick={() => email(user?.id, 'email@lol.com')}>
                    Email: {user?.email} <MdEmail />
                </p>

                <div className='txt-n-icon'
                    onClick={() => approve(user?.id, !user?.approved)}>
                    Estado de la cuenta: {user?.approved
                        ? <p className='txt-n-icon cursor-pointer px-2 py-1 rounded-md hover:bg-gray-300 hover:dark:bg-slate-800 text-emerald-500 underline underline-offset-2' >Autorizada <MdGppGood /></p>
                        : <p className='txt-n-icon cursor-pointer px-2 py-1 rounded-md hover:bg-gray-300 hover:dark:bg-slate-800 text-rose-500 underline underline-offset-2'>No autorizada <MdGppBad /></p>}
                </div>
                <i className='text-gray-500'>ID: {user.id}</i>
            </section>


            <section className='grid grid-cols-1 gap-2 w-64'>

                <button className='btn-admin-p txt-n-icon justify-center'
                    onClick={() => password(user?.id, 'contraseña')}>
                    Cambiar contraseña <MdVpnKey />
                </button>

                <button className='btn-admin-s txt-n-icon justify-center'
                    onClick={() => deleteUser(user?.id)}>
                    Eliminar usuario <MdVpnKey />
                </button>

            </section>

        </div>
    )
}

export default UserCard