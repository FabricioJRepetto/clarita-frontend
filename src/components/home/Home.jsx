import React from 'react'
// import useUser from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';
import CabinsCalendar from '../cabins/calendar/CabinsCalendar';
import AdminMessage from '../common/misc/AdminMessage';
// import QuickCheck from '../reservations/QuickCheck';

const Home = () => {
    // const { user, isLoading, error, setUser } = useUser()
    const navigate = useNavigate()
    const { notify } = useNotifications()

    const noti = () => {
        notify('testeando notificaciones', 'warning')
    }
    return (
        <div className='flex justify-between w-auto fade-in'>
            <section className='flex-grow'>

                <AdminMessage />

                <div className='grid grid-flow-col gap-2 m-auto my-2'>
                    <button className="btn-big" onClick={() => navigate('/reservations/create')}>Crear Reserva</button>
                </div>

                {/* <button className='btn-admin-p' onClick={noti}>notif test</button> */}

                {/* <div>
                    <QuickCheck />
                </div>

                <h1>Gráficos</h1>

                <h1>Presupuesto</h1>

                <h1>Conversor</h1> */}

            </section>

            <section className='full-h border-l border-l-slate-800 m-auto ml-4 pl-4'>
                <CabinsCalendar />
            </section>
        </div>
    )
}

export default Home