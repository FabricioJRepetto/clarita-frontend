import useValidate from '@/hooks/useValidate'
import { api } from '@/services/api'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
    const [searchParams] = useSearchParams({})
    const token = searchParams.get('token')

    //: TODO: pedir validación del token antes de mostrar algo
    const { data, isLoading } = useValidate()

    return (
        <div>
            {!token && <h1>No hay Token</h1>}

            <h1>Restablecer contraseña</h1>
            {isLoading && <h1>CARGANDO</h1>}
            {data?.message && <p>{data.message}</p>}
            {data?.error && <p>Token inválido</p>}

        </div>
    )
}

export default ResetPassword