import useAdmin from '@/hooks/useAdmin'
import React from 'react'
import UserCard from '../common/cards/UserCard';

const AdminUsers = () => {
    const { users } = useAdmin()

    return (
        <div>
            <h2>lista de usuarios</h2>
            <p>Lista de Usuarios: eliminar, editar contraseña, email, rol y autorizar cuentas nuevas.</p>

            <div className='mt-4 grid gap-2'>{users.map(u => (
                <UserCard user={u} key={u.id} />
            ))}</div>

        </div>
    )
}

export default AdminUsers