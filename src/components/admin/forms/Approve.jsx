import React, { useState } from 'react'
import { approve } from '@/components/admin/adminHandlers'
import { useNotifications } from 'reapop'
import Spinner from '@/components/common/misc/Spinner'

const Approve = ({ id, value, close, mutate }) => {
    const [loading, setLoading] = useState(false)
    const { notify } = useNotifications()

    const submit = async (e) => {
        e.preventDefault()
        setLoading(() => true)
        console.log(value, id)
        const res = await approve(id, value)
            .catch(err => notify(err.message, 'error'))
        console.log(res);
        if (res?.usersList) {
            notify(res.message, 'success')
            mutate(res.usersList)
            setLoading(() => false)
        }
        close()
    }

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

            {loading && <Spinner />}
        </div>
    )
}

export default Approve