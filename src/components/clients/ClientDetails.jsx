import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useClients from '@/hooks/useClients'
import { deleteApi } from '@/services/api'
import ClienDetailsCard from '@/components/common/cards/ClientDetailsCard'
import { MdDelete, MdEdit } from 'react-icons/md';
import useUser from '@/hooks/useUser'
import { useNotifications } from 'reapop';
import useModal from '@/hooks/useModal'
import Modal from '@/utils/Modal'

const ClientDetails = () => {
    const { id } = useParams()
    const { admin } = useUser()
    const { clients, error, setClients, isLoading } = useClients()
    const client = clients ? clients.find(u => u.id === id) : false
    const [isOpen, open, close] = useModal()
    const { notify } = useNotifications()

    const navigate = useNavigate()

    const handleDelete = async () => {
        const res = await deleteApi(`/client?id=${id}`).catch(err => {
            notify(err?.message, 'error')
        })

        if (!res.error) {
            notify(res.message, 'success')
            setClients(res.clientList)
            navigate('/clients')
        }
    }

    const handleEdit = () => {
        navigate(`/clients/edit/${id}`)
    }

    return (
        <>
            {isLoading && <p>Cargando...</p>}
            {error && <p>error</p>}

            {client &&
                <div className='p-2 my-1 relative border border-slate-200 dark:border-slate-700 rounded-lg'>
                    <ClienDetailsCard user={client} />

                    {admin && <>
                        <button className='btn-icon absolute top-8 right-20' onClick={handleEdit}>
                            <MdEdit />
                        </button>
                        <button className='btn-icon absolute top-8 right-9' onClick={open}>
                            <MdDelete />
                        </button>
                    </>}
                </div>}

            <Modal isOpen={isOpen} close={close}>
                {<div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
                    <span className='col-span-4'>
                        <p>¿Seguro deseas eliminar este cliente?</p>
                        <p>Esta acción es <b>irreversible</b> y puede traer problemas en otras secciones.</p>
                    </span>

                    <button type='submit' onClick={handleDelete} className="btn-admin-p col-span-2">Continuar</button>
                    <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>

                    {/* {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>} */}
                </div>}
            </Modal>
        </>
    )
}

export default ClientDetails