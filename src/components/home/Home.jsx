import React from 'react'
// import useUser from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import CabinsCalendar from '../cabins/calendar/CabinsCalendar';
import AdminMessage from '../common/AdminMessage';
import QuickCheck from '../reservations/QuickCheck';

const Home = () => {
    // const { user, isLoading, error, setUser } = useUser()
    const navigate = useNavigate()

    return (
        <div className='flex justify-between w-auto fade-in'>
            <section className='flex-grow px-4'>

                <AdminMessage />

                <div className='grid grid-flow-col gap-2 m-auto my-2'>
                    <button className="btn-big" onClick={() => navigate('/reservations/create')}>Crear Reserva</button>
                </div>

                {/* <div>
                    <QuickCheck />
                </div>

                <h1>Gráficos</h1>

                <h1>Presupuesto</h1>

                <h1>Conversor</h1> */}

            </section>

            <section className='h-screen border-l border-l-slate-800 m-auto pl-4'>
                <CabinsCalendar />
            </section>
        </div>
    )
}

export default Home