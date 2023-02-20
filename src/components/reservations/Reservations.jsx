import useReservations from '@/hooks/useReservations'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateReservation from './CreateReservation'
import ReservationsPanel from './ReservationsPanel'
import { MdCancel } from 'react-icons/md';
import { architect } from './panelUtils/architect'
import useCabins from '@/hooks/useCabins'
import { deformatDate, formatDate } from '@/utils/formatDate'

const Reservations = () => {
    const navigate = useNavigate()
    const { cabins } = useCabins()
    const { reservations, error, isLoading, } = useReservations()
    const [creation, setCreation] = useState(false)

    const [START, setSTART] = useState(false)
    const [DAYS, setDAYS] = useState(30)

    const blueprint = useMemo(() => architect(cabins, reservations, START, DAYS), [cabins, reservations, START, DAYS])

    return (
        <div>
            <section className='mb-4 flex flex-col md:flex-row justify-between'>
                <h1>Reservas</h1>
                <button onClick={() => navigate('/reservations/create')} className='btn-primary'>Registrar nueva</button>
            </section>

            {isLoading && <p>Cargando...</p>}
            {error && <p>{error?.message || 'Ha ocurrido un error'}</p>}

            <section className='flex  gap-2 pb-4'>
                <label htmlFor="startDate">
                    <p className='pl-1 text-gray-500 dark:text-gray-400'>Fecha de inicio</p>
                    <input type="date" name="startDate" id="startDate"
                        defaultValue={deformatDate(new Date().toLocaleDateString('en'))}
                        onChange={(e) => setSTART(formatDate(e.target.value))} />
                </label>

                <label htmlFor="totalDays">
                    <p className='pl-1 text-gray-500 dark:text-gray-400'>Días</p>
                    <select name="totalDays" id="totalDays" onChange={(e) => setDAYS(parseInt(e.target.value))}>
                        <option value='30'>30</option>
                        <option value='60'>60</option>
                        <option value='90'>90</option>
                    </select>
                </label>
            </section>

            <ReservationsPanel create={setCreation} creating={creation} blueprint={blueprint} />

            {creation &&
                <section className=' h-screen p-8 absolute top-0 right-0 overflow-auto z-30 border-l border-l-slate-700  bg-orange-50 dark:bg-slate-900'>
                    <CreateReservation panelData={creation} cb={() => setCreation(() => false)} />

                    <button className='btn-icon text-xl absolute top-9 right-9'
                        onClick={() => setCreation(() => false)}>
                        <MdCancel />
                    </button>
                </section>}
        </div>
    )
}

export default Reservations