import useAnnoun from '@/hooks/useAnnoun'
import React from 'react'
import AnnounCard from '../cards/AnnounCard'


const AdminMessage = () => {
    const { data } = useAnnoun()

    // const dev = false
    const dev = {
        title: 'Nueva Prueba! ',
        text: 'Disponible una versión preliminar de las Cuentas. No está terminado, probablemente haya errores. Usar con cuidado.',
        from: 'Desarrollador',
        style: 'fix'
    }

    return (
        <div className='flex flex-col gap-1'>
            {dev
                ? <AnnounCard data={dev} />
                : null}
            {data
                ? <AnnounCard data={data} />
                : null}
        </div>
    )
}

export default AdminMessage