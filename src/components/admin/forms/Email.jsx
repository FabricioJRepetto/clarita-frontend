import React, { useState } from 'react'
import { email, } from '@/components/admin/adminHandlers';
import { useNotifications } from 'reapop';

const Email = ({ id, close, mutate }) => {
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const submit = async (e) => {
        e.preventDefault()
        const [{ value }] = e.target
        if (value) {
            setLoading(() => true)
            console.log(value, id);
            const res = await email(id, value)
                .catch(err => notify(err.message, 'error'))
            console.log(res);
            if (res?.usersList) {
                notify(res.message, 'success')
                mutate(res.usersList)
                setLoading(() => false)
            }
            close()
        }
    }

    return (
        <form onSubmit={submit} className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                <p>Introduce un nuevo email:</p>
                <input type="email" required className='w-full' />
            </span>
            <button type='submit' className="btn-admin-p col-span-2">guardar</button>
            <button type='button' onClick={close} className="btn-admin-s col-span-2">cancelar</button>

            {loading && <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50'>cargando</div>}
        </form>
    )
}

export default Email