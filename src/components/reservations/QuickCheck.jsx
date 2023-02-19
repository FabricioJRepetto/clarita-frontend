import useCabins from '@/hooks/useCabins'
import { datesValidator, fillDates } from '@/utils/formUtils'
import React, { useEffect, useRef, useState } from 'react'

const QuickCheck = () => {
    const { cabins } = useCabins()
    const [avCabins, setAvCabins] = useState(false)
    const [message, setMessage] = useState({ checkin: 'Introduce fechas para ver disponibilidad.' })
    const checkin = useRef(null)
    const checkout = useRef(null)

    const datesHandler = (e) => {
        reset()
        fillDates(e)
    }

    const handler = (e) => {
        e.preventDefault()
        if (checkin.current.value && checkout.current.value) {
            // Looks for available cabins
            datesValidator(cabins, setAvCabins, setMessage)
        }
    }

    const reset = () => {
        setAvCabins(() => false)
        setMessage(() => ({ checkin: 'Introduce fechas para ver disponibilidad.' }))
    }

    useEffect(() => {
        if (checkin?.current.value && checkout?.current.value) {
            if (!avCabins) {
                setMessage(() => ({ checkin: 'No hay alojamiento disponible en estas fechas.' }))
            } else setMessage(() => ({ checkin: 'Alojamiento disponible:' }))
        }
    }, [avCabins])

    return (
        <div className=''>
            <b className='text-2xl'>Disponibilidad</b>
            <form className='grid grid-cols-5 gap-2' onSubmit={handler}>
                {/*checkin*/}
                <label htmlFor='checkin' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>checkin</p>
                    <input ref={checkin} type="date" id='checkin' name='checkin' placeholder='Chcekin' className='w-full' onChange={datesHandler} />
                </label>
                {/*checkout*/}
                <label htmlFor='checkout' className='col-span-2'>
                    <p className='text-gray-500 pl-2'>checkout</p>
                    <input ref={checkout} type="date" id='checkout' name='checkout' placeholder='Checkout' className='w-full' onChange={datesHandler} />
                </label>
                {/*nights*/}
                <label htmlFor='nights' className='col-span-1'>
                    <p className='text-gray-500 pl-2'>noches</p>
                    <input type="number" id='nights' name='nights' placeholder='Noches' className='w-full' onChange={datesHandler} />
                </label>
            </form>
            <button className='btn-primary' onClick={handler}>buscar</button>
            <button className='btn-secondary' onClick={reset}>reset</button>
            <section>
                {message?.checkin && message?.checkin}
                {!!avCabins?.length &&
                    avCabins.map(c => (
                        <p key={c.id}>{c.name}</p>
                    ))}
            </section>
        </div>
    )
}

export default QuickCheck