import useAnnoun from '@/hooks/useAnnoun'
import React from 'react'
import AnnounCard from '../cards/AnnounCard'


const AdminMessage = () => {
    const { data } = useAnnoun()

    // const dev = false
    const dev = {
        title: 'Nuevo!',
        text: 'Sistema de notificaciones. Opción para agregar multiples pagos a una reserva y perfil de administrador. Ahora las reservas muestran fechas de creación/edición y su creador.',
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