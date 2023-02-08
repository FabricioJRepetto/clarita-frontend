import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useClients from '@/hooks/useClients'
import { deleteApi } from '@/services/api'
import ClienDetailsCard from '../common/cards/ClientDetailsCard'

const ClientDetails = () => {
    const { id } = useParams()
    const { clients, isLoading, error, setClients } = useClients()
    const user = clients ? clients.find(u => u.id === id) : false
    //: TODO: Create Notification system
    const [someError, setSomeError] = useState('')

    const navigate = useNavigate()

    const handleDelete = async () => {
        const res = await deleteApi(`/client?id=${id}`).catch(err => {
            console.error(err)
            setSomeError(err.message)
        })

        if (res) {
            console.log('handleDelete', res);
            setClients(res)
            navigate('/clients')
        }
    }

    const handleEdit = () => {
        navigate(`/clients/edit/${id}`)
    }

    return (
        <>
            {user &&
                <div className='p-2 my-1 border border-slate-300 dark:border-slate-700 rounded-lg'>
                    <ClienDetailsCard user={user} />
                    <br />
                    <button className='px-2 mx-4' onClick={handleEdit}>editar</button>
                    <button className='px-2 mx-4' onClick={handleDelete}>borrar</button>
                </div>}

            {(error || someError) && <b>error: {error?.message || someError}</b>}
        </>
    )
}

export default ClientDetails