import useCabins from '@/hooks/useCabins'
import React from 'react'
import CabinMiniCard from '../common/cards/CabinMiniCard'

const CabinsShortcut = () => {
    const { cabins, isLoading, error } = useCabins()

    return (
        <div>
            {isLoading && <p>Cargando...</p>}
            {error && <p>{error.message || 'Ha ocurrido un error'}</p>}

            <div className='w-full h-20 grid grid-flow-col gap-2 justify-center items-center'>
                {cabins && cabins.map(e => (
                    <CabinMiniCard key={e.id} data={e} />
                ))}
            </div>
        </div>
    )
}

export default CabinsShortcut