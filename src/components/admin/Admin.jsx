import useUser from '@/hooks/useUser'
import React, { useState } from 'react'
import AdminUsers from './AdminUsers'
import Annuncement from './Annuncement'
import { MdLocalPolice } from 'react-icons/md';

const Admin = () => {
    const { admin } = useUser()
    const [section, setSection] = useState(0)

    if (!admin) {
        //: TODO: TESTEAR
        return (<h1>No autorizado</h1>)
    }

    const sections = [
        <AdminUsers />,
        <Annuncement />,
        <p>Opciones: posibles configuraciones paras futuras implementaciones como el conversor de monedas o presupuestario.</p>
    ]

    const correctSection = sections[section]

    return (
        <div className='relative flex flex-col w-full full-h'>

            <MdLocalPolice className='absolute top-0 right-0 text-9xl text-gray-200 dark:text-slate-800/50' />

            <header className='grid grid-cols-6 border-b z-10 border-b-orange-500'>
                <h1 className='col-span-6'>Admin</h1>

                <button className={`panel-opt ${section === 0 ? 'font-semibold dark:text-slate-900 bg-orange-500 rounded-t-sm' : ''}`} onClick={() => setSection(0)}>
                    Usuarios
                </button>

                <button className={`panel-opt ${section === 1 ? 'font-semibold dark:text-slate-900 bg-orange-500 rounded-t-sm' : ''}`} onClick={() => setSection(1)}>
                    Anuncio
                </button>

                <button className={`panel-opt ${section === 2 ? 'font-semibold dark:text-slate-900 bg-orange-500 rounded-t-sm' : ''}`} onClick={() => setSection(2)}>
                    Opciones
                </button>
            </header>

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto'>
                {correctSection}
            </section>
        </div>
    )
}

export default Admin