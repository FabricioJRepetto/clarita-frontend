import useCabins from '@/hooks/useCabins'
import { deformatDate } from '@/utils/formatDate'
import { datesValidator, fillDates } from '@/utils/formUtils'
import React, { useState } from 'react'

const QuickCheck = () => {
    const { cabins } = useCabins()
    const [avCabins, setAvCabins] = useState([])
    const [message, setMessage] = useState('Introduce fechas para ver disponibilidad.')
    const [errors, setErrors] = useState()
    const today = deformatDate(new Date(new Date().toLocaleDateString('en')))

    const datesHandler = (e) => {
        reset()
        fillDates(e)
    }

    const handler = (e) => {
        e.preventDefault()
        const [{ value: checkin }, { value: checkout }] = e.target
        if (checkin && checkout) {
            // Looks for available cabins
            const value = datesValidator(cabins, setAvCabins, setErrors)
            if (!!value?.length) {
                setMessage(() => ('Alojamiento disponible:'))
            }
        }
    }

    const reset = () => {
        setAvCabins(() => [])
        setMessage(() => ('Introduce fechas para ver disponibilidad.'))
        setErrors(() => false)
    }

    return (
        <div className='h-fit w-full px-4 pt-2 pb-4 flex flex-col gap-2 justify-between relative'>

            <p className='text-xl mb-2'>Disponibilidad</p>

            <form className='grid grid-cols-5 gap-2' onSubmit={handler}>
                {/*checkin*/}
                <label htmlFor='checkin' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>checkin</p>
                    <input type="date" id='checkin' name='checkin' defaultValue={today} className='w-full' onChange={datesHandler} />
                </label>
                {/*checkout*/}
                <label htmlFor='checkout' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>checkout</p>
                    <input type="date" id='checkout' name='checkout' className='w-full' onChange={datesHandler} />
                </label>
                {/*nights*/}
                <label htmlFor='nights' className='col-span-1'>
                    <p className='text-gray-500 pl-2'>noches</p>
                    <input type="number" id='nights' name='nights' placeholder='Noches' className='w-full' onChange={datesHandler} />
                </label>

                <button type='submit' className='btn-primary col-span-1'>buscar</button>
                <button type='reset' onClick={reset} className='btn-secondary col-span-1'>reset</button>
            </form>

            <section className='mt-4'>
                {message && <p className={`text-gray-400 uppercase text-xs`}>{message}</p>}
                {errors?.checkin && <p className={`text-rose-400 uppercase text-xs`}>{errors.checkin}</p>}
                {!!avCabins?.length &&
                    avCabins.map(c => (
                        <p key={c.id} className='capitalize'>{c.name}</p>
                    ))}
            </section>
        </div>
    )
}

export default QuickCheck