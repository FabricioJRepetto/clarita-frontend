import useAnnoun from '@/hooks/useAnnoun'
import React from 'react'
import AnnounCard from '../cards/AnnounCard'


const AdminMessage = () => {
    const { data } = useAnnoun()

    // const dev = false
    const dev = {
        title: 'Nuevo!',
        text: 'Ya se pueden agregar pagos extras a las reservas de manera rápida, para completar pagos o cualquier otra necesidad. Ahora se accede desde los detalles de reserva; Próximamente habrá un atajo en la home.',
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