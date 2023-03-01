import CreateReservation from '@/components/reservations/CreateReservation'
import useCabins from '@/hooks/useCabins'
import { correctDate, deformatDate, formatDate } from '@/utils/formatDate'
import { datesValidator, fillDates } from '@/utils/formUtils'
import React, { useState } from 'react'
import QuickSearchCard from './QuickSearchCard'
import { MdCancel } from 'react-icons/md'

const QuickCheck = () => {
    const { cabins } = useCabins()
    const [avCabins, setAvCabins] = useState([])
    const [message, setMessage] = useState('Introduce fechas para ver disponibilidad.')
    const [errors, setErrors] = useState()
    const today = deformatDate(new Date(new Date().toLocaleDateString('en')))
    const [creation, setCreation] = useState(false)
    // const [checkin, setCheckin] = useState(correctDate(new Date(new Date().toLocaleDateString('en'))))
    // const [checkout, setCheckout] = useState('')


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

    //: TODO: terminar esto
    const createReserv = (id) => {
        setCreation(() => false)
        const IN = formatDate(document.getElementById('checkin').value),
            OUT = formatDate(document.getElementById('checkout').value)

        const aux = {
            cabin: id,
            checkin: IN,
            checkout: OUT
        }
        console.log(aux);
        // setCreation(() => aux)

    }

    return (
        <div className='h-fit w-full px-4 pt-2 pb-4 flex flex-col gap-2 justify-between'>

            <p className='text-xl -mb-2'>Disponibilidad</p>

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
                        <QuickSearchCard key={c.id} data={c} createReserv={createReserv} />
                    ))}
            </section>

            {creation &&
                <section className='h-screen p-8 absolute top-0 right-0 overflow-y-auto z-30 border-l border-l-slate-700  bg-orange-50 dark:bg-slate-900'>
                    <CreateReservation panelData={creation} cb={() => setCreation(() => false)} />

                    <button className='btn-icon text-xl absolute top-9 right-9'
                        onClick={() => setCreation(() => false)}>
                        <MdCancel />
                    </button>
                </section>}

        </div>
    )
}

export default QuickCheck