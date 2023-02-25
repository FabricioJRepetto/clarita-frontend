import React from 'react'
// import useUser from '@/hooks/useUser';
import CabinsCalendar from '../cabins/calendar/CabinsCalendar';
import AdminMessage from '../common/misc/AdminMessage';
import Unpaid from './widgets/debtors/Unpaid';
import ShortCut from './widgets/shortcut/ShortCut';
import QuickCheck from '../reservations/QuickCheck';
import { MdPersonAddAlt1, MdBookmarkAdd } from 'react-icons/md';


const Home = () => {
    // const { user, isLoading, error, setUser } = useUser()

    return (
        <div className='flex justify-between w-full fade-in'>

            <section className='home-main'>

                <div className='col-span-6'>
                    <AdminMessage />
                </div>

                <div className='col-span-3 hover:dark:border-slate-600 transition-colors'>
                    <ShortCut title='Crear Reserva' to='/reservations/create' icon={<MdBookmarkAdd />} />
                </div>

                <div className='col-span-3 hover:dark:border-slate-600 transition-colors'>
                    <ShortCut title='Registrar Cliente' to='/clients/create' icon={<MdPersonAddAlt1 />} />
                </div>

                <div className='col-span-6'>
                    <QuickCheck />
                </div>

                <div className='col-span-4'>
                    <Unpaid />
                </div>

                {/* <div className='col-span-1 flex justify-center items-center gap-2 relative overflow-clip'>

                    <span className='absolute w-full bottom-0'>
                        <Loading />
                    </span>

                    <AiOutlineLoading className='text-4xl animate-spin' />
                </div> */}


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