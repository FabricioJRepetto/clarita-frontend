import useUser from '@/hooks/useUser'
import React, { useState } from 'react'
import AdminUsers from './AdminUsers'
import Annuncement from './Annuncement'

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
        <p>Opciones: Conversor de moneda y posibles configuraciones paras futuras implementaciones.</p>
    ]

    const correctSection = sections[section]

    return (
        <div className='grid grid-cols-6 w-full full-h'>
            <section className='flex flex-col pl-4 col-span-1 h-full border-r border-r-slate-700'>

                <p className='text-3xl my-4'>Admin</p>

                <button className={`panel-opt ${section === 0 ? 'bg-slate-100 dark:bg-slate-800' : ''}`} onClick={() => setSection(0)}>Usuarios
                    <span className="absolute flex h-3 w-3 top-1 right-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90"></span>
                        <span className="inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                </button>

                <button className={`panel-opt ${section === 1 ? 'bg-slate-100 dark:bg-slate-800' : ''}`} onClick={() => setSection(1)}>Anuncio</button>
                <button className={`panel-opt ${section === 2 ? 'bg-slate-100 dark:bg-slate-800' : ''}`} onClick={() => setSection(2)}>Opciones</button>

            </section>

            <section className='pt-16 pl-8 col-span-5'>
                {correctSection}
            </section>
        </div>
    )
}

export default Admin