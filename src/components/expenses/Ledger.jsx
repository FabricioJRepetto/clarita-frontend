import React, { useState } from 'react'
import Header from '../common/misc/Header'
import Month from './Month'
import Week from './Week'

const Expenses = () => {
    const [section, setSection] = useState(0)
    const date = new Date(new Date()).toLocaleDateString('en')

    const sections = [
        <Month date={date} />,
        <Week date={date} />,
    ]
    const correctSection = sections[section]

    //? - 1 - Mes
    //? - 2 - Balance General

    return (
        <div className='relative flex flex-col w-full full-h fade-in'>
            <Header title={'Cuentas'} sections={['Registros', 'Balance General']} section={section} setSection={setSection} />

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto relative'>
                {correctSection}
            </section>

        </div>
    )
}

export default Expenses 