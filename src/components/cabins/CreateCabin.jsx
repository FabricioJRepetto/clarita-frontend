import React from 'react'
import CabinForm from '../common/forms/CabinForm'
import { createCabinSubmit, editCabinSubmit } from '@/utils/handlers/cabinSubmitHandler'
import { useNavigate, useParams } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'
import { useNotifications } from 'reapop';

const CreateCabin = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { setCabins } = useCabins()
    const { notify } = useNotifications()

    const cb = (res) => {
        notify(res.message, 'success')
        setCabins(res.cabinsList)
        navigate('/cabins/')
    }

    return (
        <>
            <h1>Crear Cabaña</h1>
            <CabinForm handler={id ? editCabinSubmit : createCabinSubmit} cb={cb} />
        </>
    )
}

export default CreateCabin