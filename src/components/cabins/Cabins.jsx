import useCabins from '@/hooks/useCabins'
import useUser from '@/hooks/useUser'
import { isMobile } from '@/utils/isMobile'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CabinCard from '../common/cards/CabinCard'
import Loading from '../common/misc/Loading'

const Cabins = () => {
    const navigate = useNavigate()
    const { admin } = useUser()
    const { cabins, isLoading, error } = useCabins()
    const mobile = isMobile()

    return (
        <div className={`relative flex flex-col w-full full-h fade-in`}>
            <section className={`mb-4 flex flex-col md:flex-row justify-between ${mobile ? 'ml-8' : ''}`}>
                <h1 className={`${mobile ? 'text-3xl' : ''}`}>Cabañas</h1>
                {admin &&
                    <button className="btn-primary"
                        onClick={() => navigate('/cabins/create')}>
                        Crear Cabaña
                    </button>}
            </section>

            <div className='grid grid-cols-1 sm:grid-cols-4 gap-2 my-2'>
                {isLoading &&
                    <div className='relative h-1 mb-2'>
                        <span className='loading-container'>
                            <Loading />
                        </span>
                    </div>}
                {error && <p>{error?.message || 'Ha ocurrido un error'}</p>}

                {cabins && cabins.map(e => (
                    <CabinCard key={e.id} data={e} />
                ))}
            </div>
        </div>
    )
}

export default Cabins