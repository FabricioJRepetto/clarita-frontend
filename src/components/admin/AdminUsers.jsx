import useAdmin from '@/hooks/useAdmin'
import React from 'react'

const AdminUsers = () => {
    const { users } = useAdmin()

    return (
        <div>
            <h2>lista de usuarios</h2>
            <p>Lista de Usuarios: eliminar, editar contraseña, email, rol y autorizar cuentas nuevas.</p>

            <div className='mt-4'>{users.map(u => (
                <div key={u.id} className='p-4'>
                    <p>{u.user_name}: {u.role}</p>
                    <p>{u.email}</p>
                    <p>Cuenta autorizada: {String(u.approved)}</p>
                    <p>{u.id}</p>
                </div>
            ))}</div>

        </div>
    )
}

export default AdminUsers