import useCabins from '@/hooks/useCabins'
import useUser from '@/hooks/useUser'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CabinCard from '../common/cards/CabinCard'

const Cabins = () => {
    const navigate = useNavigate()
    const { admin } = useUser()
    const { cabins, isLoading, error } = useCabins()

    return (
        <>
            <section className='mb-4 flex flex-col md:flex-row justify-between'>
                <h1>Cabañas</h1>
                {admin && <button className="btn-primary" onClick={() => navigate('/cabins/create')}>Crear</button>}
            </section>

            <div className='grid grid-cols-4 gap-2 my-2'>
                {isLoading && <p>Cargando...</p>}
                {error && <p>{error || 'Ha ocurrido un error'}</p>}

                {cabins && cabins.map(e => (
                    <CabinCard key={e.id} data={e} />
                ))}
            </div>
        </>
    )
}

export default Cabins