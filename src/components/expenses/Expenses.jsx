import React, { useState } from 'react'
import Header from '../common/misc/Header'
import Week from './Week'

const Expenses = () => {
    const [section, setSection] = useState(0)

    const sections = [
        <Week />,
        <Week />,
        <Week />,
        <p>Més: calendario del mes, con detalles en cada día. Opción para seleccionar otro més.</p>,
        <p>Balance General: Anual?</p>,
    ]
    const correctSection = sections[section]

    //? - 1 - Semana
    //? - 2 - Més
    //? - 3 - Balance General

    const [errors, setErrors] = useState({})

    return (
        <div className='relative flex flex-col w-full full-h fade-in'>
            <Header title={'Cuentas'} sections={['Semana', 'Més', 'Balance General']} section={section} setSection={setSection} />

            <section className='full-h pt-8 pl-8 col-span-5 overflow-y-auto'>
                {correctSection}
            </section>

            <section>
                <form onSubmit={null} autoComplete='off' className='grid grid-cols-8 gap-2 p-2'>
                    {/*tipo*/}
                    <label htmlFor='movementType' className='col-span-2'>
                        <p className='text-gray-500 pl-2'>tipo</p>
                        <select name="movementType" id="movementType" className='w-full'>
                            <option value={'expense'}>Gasto</option>
                            <option value={'incom'}>Ingreso</option>
                        </select>
                        <div className='h-6 text-sm text-rose-500'>{errors?.movementType || ''}</div>
                    </label>

                    {/*descripcion*/}
                    <label htmlFor='description' className='col-span-4'>
                        <p className='text-gray-500 pl-2'>descripción</p>
                        <input type="text" id='description' name='description' placeholder='Descripción' className='w-full' />
                        <div className='h-6 text-sm text-rose-500'>{errors?.description || ''}</div>
                    </label>

                    {/*monto*/}
                    <label htmlFor='amount' className='col-span-2'>
                        <p className='text-gray-500 pl-2'>monto</p>
                        <input type="number" id='amount' name='amount' placeholder='Monto' className='w-full' />
                        <div className='h-6 text-sm text-rose-500'>{errors?.amount || ''}</div>
                    </label>

                </form>
            </section>
        </div>
    )
}

export default Expenses 