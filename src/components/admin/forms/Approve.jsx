import React, { useState } from 'react'
import { approve } from '@/components/admin/adminHandlers';

const Approve = ({ id, value, close, mutate }) => {
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(() => true)
        console.log(value, id)
        const res = await approve(id, value)
        console.log(res);
        if (res?.usersList) {
            mutate(res.usersList)
            setLoading(() => false)
        }
        close()
    }
    //: TODO: LOADING
    return (
        <div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                {value
                    ? <p>¿Autorizar cuenta?</p>
                    : <p>¿Deseas revocar la autorización de esta cuenta?</p>
                }
            </span>

            <button type='submit' onClick={submit} className="btn-admin-p col-span-2">Continuar</button>
            <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>

            {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>}
        </div>
    )
}

export default Approve