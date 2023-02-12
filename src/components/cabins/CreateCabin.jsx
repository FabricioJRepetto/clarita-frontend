import React from 'react'
import CabinForm from '../common/forms/CabinForm'
import { createCabinSubmit, editCabinSubmit } from '@/utils/cabinSubmitHandler'
import { useNavigate, useParams } from 'react-router-dom'
import useCabins from '@/hooks/useCabins'

const CreateCabin = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { setCabins } = useCabins()

    const cb = (res) => {
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