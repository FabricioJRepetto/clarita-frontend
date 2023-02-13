import useCabins from '@/hooks/useCabins'
import React from 'react'
import CabinMiniCard from '../common/cards/CabinMiniCard'

const CabinsShortcut = () => {
    const { cabins, isLoading, error } = useCabins()

    return (
        <div>
            <p>Cabañas</p>
            {isLoading && <p>Cargando...</p>}
            {error && <p>{error.message || 'Ha ocurrido un error'}</p>}

            <div className='w-full h-20 grid grid-flow-col gap-2 justify-center items-center border border-slate-300 dark:border-slate-700 rounded-lg'>
                {cabins && cabins.map(e => (
                    <CabinMiniCard key={e.id} data={e} />
                ))}
            </div>
        </div>
    )
}

export default CabinsShortcut