import React from 'react'
// import useUser from '@/hooks/useUser';
import CabinsCalendar from '../cabins/calendar/CabinsCalendar';
import AdminMessage from '../common/misc/AdminMessage';
import Unpaid from './widgets/debtors/Unpaid';
import ShortCut from './widgets/shortcut/ShortCut';
import QuickCheck from '../reservations/QuickCheck';

const Home = () => {
    // const { user, isLoading, error, setUser } = useUser()

    return (
        <div className='flex justify-between w-full fade-in'>

            <section className='home-main'>

                <div className='col-span-6'>
                    <AdminMessage />
                </div>

                <div className='col-span-2 hover:dark:border-slate-600 transition-colors'>
                    <ShortCut title='Crear Reserva' to='/reservations/create' />
                </div>

                <div className='col-span-2 hover:dark:border-slate-600 transition-colors'>
                    <ShortCut title='Registrar Cliente' to='/clients/create' />
                </div>

                <div className='col-span-2 hover:dark:border-slate-600 transition-colors'>
                    <ShortCut title='Registrar Cliente' to='/clients/create' />
                </div>

                <div className='col-span-6'>
                    <QuickCheck />
                </div>

                <div className='col-span-4'>
                    <Unpaid />
                </div>


                {/* <h1>Presupuesto</h1>

                <h1>Conversor</h1>

                <h1>Gráficos</h1> */}

            </section>

            <section className='full-h border-l border-l-slate-800 m-auto ml-4 pl-4'>
                <CabinsCalendar />
            </section>
        </div>
    )
}

export default Home