import React from 'react'
// import useUser from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import CabinsShortcut from '../cabins/CabinsShortcut';
import TestCalendar from '../common/calendar/TestCalendar';
import AdminMessage from '../common/AdminMessage';

const Home = () => {
    //: TODO: create a different hook for user and login
    // const { user, isLoading, error, setUser } = useUser()
    const navigate = useNavigate()

    return (
        <div className='flex justify-between w-auto'>
            <section className='flex-grow px-4'>

                <AdminMessage />

                <CabinsShortcut />

                <div className='grid grid-flow-col gap-2 m-auto my-2'>
                    <button className="btn-big" onClick={() => navigate('/clients')}>Clientes</button>
                    <button className="btn-big" onClick={() => navigate('/reservations')}>Reservas</button>
                    <button className="btn-big" onClick={() => navigate('/cabins')}>Cabañas</button>
                </div>

                <h1>Presupuesto</h1>

                <h1>Conversor</h1>

            </section>

            <section className='h-screen border-l border-l-slate-800 m-auto pl-4'>
                <TestCalendar />
            </section>
        </div>
    )
}

export default Home