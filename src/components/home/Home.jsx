import React, { useState } from 'react'
// import useUser from '@/hooks/useUser';
import CabinsCalendar from '../cabins/calendar/CabinsCalendar';
import AdminMessage from '../common/misc/AdminMessage';
import Unpaid from './widgets/debtors/Unpaid';
import ShortCut from './widgets/shortcut/ShortCut';
import QuickCheck from './widgets/quickSearch/QuickCheck';
import { MdPersonAddAlt1, MdBookmarkAdd, MdOutlineFirstPage, MdOutlineLastPage } from 'react-icons/md';
import { isMobile } from '@/utils/isMobile';
// import Loading from '../common/misc/Loading';
// import { AiOutlineLoading } from 'react-icons/ai';

const Home = () => {
    // const { user, isLoading, error, setUser } = useUser()
    const [colapsed, setColapsed] = useState(false)
    const mobile = isMobile()

    return (
        <div style={mobile ? {} : { minWidth: 'calc(1000px - 18rem)' }}
            className='flex justify-between w-full fade-in'>

            <div className={`absolute w-10/12 sm:w-1/3 top-4 ${mobile ? 'right-4' : ''} mx-auto z-10`}>
                <AdminMessage />
            </div>

            <section className='home-main pt-12'>

                {/* <div className='col-span-6'>
                    <AdminMessage />
                </div> */}

                <div className='col-span-2 sm:col-span-3 hover:dark:border-slate-600 transition-colors'>
                    <ShortCut title='Nueva Reserva' to='/reservations/create' icon={<MdBookmarkAdd />} />
                </div>

                <div className='col-span-2 sm:col-span-3 hover:dark:border-slate-600 transition-colors'>
                    <ShortCut title='Registrar Cliente' to='/clients/create' icon={<MdPersonAddAlt1 />} />
                </div>

                <div className='col-span-4 sm:col-span-6'>
                    <QuickCheck />
                </div>

                <div className='col-span-4 sm:col-span-3'>
                    <Unpaid />
                </div>

                {/* <div className='col-span-4'>
                    <label htmlFor='submit' className='pt-6 col-span-1 '>
                        <button type='submit' id='submit' className="txt-n-icon btn-primary justify-center w-full px-0">
                            <AiOutlineLoading className='animate-spin' />
                            Registrando
                        </button>
                    </label>
                </div> */}

                {/* <div className='col-span-2 flex justify-center items-center gap-2 relative overflow-clip'>

                    <span className='absolute w-full bottom-0'>
                        <Loading />
                    </span>

                    {true &&
                        <div className='relative h-1 mb-2'>
                            <span className='loading-container'>
                                <Loading />
                            </span>
                        </div>}

                    <AiOutlineLoading className='text-4xl animate-spin' />
                </div> */}


                {/* <h1>Presupuesto</h1>

                <h1>Conversor</h1>

                <h1>Gráficos</h1> */}

            </section>

            {!mobile &&
                <section className={`full-h border-l relative border-l-slate-800 m-auto ml-4 pl-4 ${colapsed ? '-mr-80' : 'mr-0'} transition-all`}>

                    <button aria-label='expandir' className={`btn-icon py-1 absolute top-2 -left-5 rounded-l bg-slate-800 ${colapsed ? 'px-1 -left-8' : ''} transition-none`}
                        onClick={() => setColapsed(!colapsed)}>
                        {colapsed ? <MdOutlineFirstPage /> : <MdOutlineLastPage />}
                    </button>

                    <CabinsCalendar />
                </section>}
        </div>
    )
}

export default Home