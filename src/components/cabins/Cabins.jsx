import useCabins from '@/hooks/useCabins'
import React from 'react'
import CabinCard from '../common/cards/CabinCard'

const Cabins = () => {
    const { cabins, isLoading, error } = useCabins()
    return (
        <div>
            <h1>Cabañas</h1>
            <button className="btn-primary">Crear</button>

            <div className='grid grid-cols-4 gap-2 my-2'>
                {isLoading && <p>Cargando...</p>}
                {error && <p>{error || 'Ha ocurrido un error'}</p>}
                {cabins && cabins.map(e => (
                    <CabinCard key={e.id} data={e} />
                ))}
            </div>
        </div>
    )
}

export default Cabins