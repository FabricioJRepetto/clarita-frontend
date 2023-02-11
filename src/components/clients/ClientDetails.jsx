import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useClients from '@/hooks/useClients'
import { deleteApi } from '@/services/api'
import ClienDetailsCard from '@/components/common/cards/ClientDetailsCard'
import { MdDelete, MdEdit } from 'react-icons/md';
import useUser from '@/hooks/useUser'

const ClientDetails = () => {
    const { id } = useParams()
    const { user } = useUser()
    const { clients, error, setClients } = useClients()
    const client = clients ? clients.find(u => u.id === id) : false
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
            {client &&
                <div className='p-2 my-1 relative border border-slate-200 dark:border-slate-700 rounded-lg'>
                    <ClienDetailsCard user={client} />
                    {(user.role === 'admin' || user.role === 'master') && <>
                        <button className='btn-icon absolute top-8 right-20' onClick={handleEdit}>
                            <MdEdit />
                        </button>
                        <button className='btn-icon absolute top-8 right-9' onClick={handleDelete}>
                            <MdDelete />
                        </button>
                    </>}
                </div>}

            {(error || someError) && <b>error: {error?.message || someError}</b>}
        </>
    )
}

export default ClientDetails