import useAnnoun from '@/hooks/useAnnoun'
import React from 'react'
import AnnounCard from './cards/AnnounCard'


const AdminMessage = () => {
    const { data } = useAnnoun()

    // const dev = false
    const dev = {
        title: 'Versión preliminar',
        text: 'Comienzan las pruebas! La página continúa en desarrollo, por favor, comunicar todo error y/o sugerencias.',
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