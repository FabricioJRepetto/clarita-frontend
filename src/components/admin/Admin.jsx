import useUser from '@/hooks/useUser'
import React, { useState } from 'react'
import AdminUsers from './AdminUsers'
import Annuncement from './Annuncement'
import { MdLocalPolice } from 'react-icons/md';
import Header from '../common/misc/Header';

const Admin = () => {
    const { admin } = useUser()
    const [section, setSection] = useState(0)

    if (!admin) {
        //: TODO: TESTEAR
        return (
            <h1>No autorizado</h1>
        )
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

            <Header title={'Admin'} sections={['Usuarios', 'Anuncio', 'Opciones']} section={section} setSection={setSection} admin />

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto'>
                {correctSection}
            </section>
        </div>
    )
}

export default Admin