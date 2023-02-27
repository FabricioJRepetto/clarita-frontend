import React, { useState } from 'react'
import Header from '../common/misc/Header'
import Day from './Day'
import Week from './Week'

const Expenses = () => {
    const [section, setSection] = useState(0)
    const date = new Date(new Date()).toLocaleDateString('en')

    const sections = [
        <Day date={date} />,
        <Week date={date} />,
        <p>Mes: calendario del mes, con detalles en cada día. Opción para seleccionar otro més.</p>,
        <p>Mes: calendario del mes, con detalles en cada día. Opción para seleccionar otro més.</p>,
        <p>Balance General: Anual?</p>,
    ]
    const correctSection = sections[section]

    //? - 1 - Semana
    //? - 2 - Mes
    //? - 3 - Balance General

    return (
        <div className='relative flex flex-col w-full full-h fade-in'>
            <Header title={'Cuentas'} sections={['Hoy', 'Semana', 'Mes', 'Balance General']} section={section} setSection={setSection} />

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto relative'>
                {correctSection}
            </section>

        </div>
    )
}

export default Expenses 