import React from 'react'
import useUser from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import CabinsShortcut from '../cabins/CabinsShortcut';
import Calendar from '../common/calendar/Calendar';

const Home = () => {
    //: TODO: create a different hook for user and login
    const { user, isLoading, error, setUser } = useUser()
    const navigate = useNavigate()

    return (
        <div>
            <section className='grid grid-flow-col gap-2 max-w-7xl m-auto my-2'>
                <button className="btn-big" onClick={() => navigate('/clients')}>Clientes</button>
                <button className="btn-big" onClick={() => navigate('/reservations')}>Reservas</button>
                <button className="btn-big" onClick={() => navigate('/cabins')}>Cabañas</button>
            </section>

            <section className='max-w-7xl m-auto'>
                <CabinsShortcut />
            </section>

            <section className='max-w-7xl m-auto'>
                <Calendar />
            </section>
        </div>
    )
}

export default Home