import useAdmin from '@/hooks/useAdmin'
import React from 'react'
import { MdVpnKey } from 'react-icons/md';

const AdminUsers = () => {
    const { users } = useAdmin()

    const approve = (user_id, arg) => {
        const aux = { user_id, approved: arg }
        console.log('/user/admin/approve', '{ user_id, approved: boolean }', aux);
    }
    const password = (user_id, newPassword) => {
        const aux = { user_id, newPassword }
        console.log('/user/admin/password', '{ user_id, newPassword }', aux);

    }
    const email = (user_id, newEmail) => {
        const aux = { user_id, newEmail }
        console.log('/user/admin/email', '{ user_id, newEmail }', aux);

    }
    const role = (user_id, newRole) => {
        const aux = { user_id, newRole }
        console.log('/user/admin/role', '{ user_id, newRole }', aux);

    }

    const deleteUser = (user_id) => {
        console.log('ESTAS SEGURO?');
    }

    return (
        <div>
            <h2>lista de usuarios</h2>
            <p>Lista de Usuarios: eliminar, editar contraseña, email, rol y autorizar cuentas nuevas.</p>

            <div className='mt-4'>{users.map(u => (

                <div key={u.id} className='p-4 w-72'>

                    <b className='text-lg capitalize'>{u.user_name}</b>

                    <p className='txt-n-icon cursor-pointer'
                        onClick={() => role(u.id, 'newRole')}>
                        Rol: {u.role} <MdVpnKey />
                    </p>

                    <p className='txt-n-icon cursor-pointer'
                        onClick={() => email(u.id, 'email@lol.com')}>
                        Email: {u.email} <MdVpnKey />
                    </p>

                    <p className='txt-n-icon cursor-pointer'
                        onClick={() => approve(u.id, !u.approved)}>
                        Cuenta autorizada: {String(u.approved)} <MdVpnKey />
                    </p>

                    <section className='grid grid-cols-1 gap-2 w-64'>

                        <button className='btn-admin-p txt-n-icon justify-center'
                            onClick={() => password(u.id, 'contraseña')}>
                            Cambiar contraseña <MdVpnKey />
                        </button>

                        <button className='btn-admin-s txt-n-icon justify-center'
                            onClick={() => deleteUser(u.id)}>
                            Eliminar usuario <MdVpnKey />
                        </button>

                    </section>

                    <i>ID: {u.id}</i>
                </div>
            ))}</div>

        </div>
    )
}

export default AdminUsers