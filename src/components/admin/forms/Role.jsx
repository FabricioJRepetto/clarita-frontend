import React, { useState } from 'react'
import { role } from '@/components/admin/adminHandlers';

const Role = ({ id, close, mutate }) => {
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(() => true)
        const [{ value }] = e.target
        if (value) {
            console.log(value, id);
            const res = await role(id, value)
            console.log(res);
            if (res?.usersList) {
                mutate(res.usersList)
                setLoading(() => false)
            }
            close()
        }
    }
    //: TODO: LOADING
    return (
        <form onSubmit={submit} className='relative grid grid-col grid-cols-2 gap-4 w-fit'>

            <span className='col-span-2'>
                <p>Selecciona un rol:</p>

                <select id='role-select' name="role-select" defaultValue='' required className='w-full' >
                    <option disabled={true} value="" className='text-gray-500'>roles</option>
                    <option value={'staff'}>Staff</option>
                    <option value={'demote'}>Quitar rol</option>
                    <option disabled={true} value=""></option>
                    <option value={'admin'} className='text-orange-500'>Admin</option>
                </select>
            </span>

            <button type='submit' className="btn-admin-p">guardar</button>
            <button type='button' onClick={close} className="btn-admin-s">cancelar</button>

            {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>}
        </form>
    )
}

export default Role