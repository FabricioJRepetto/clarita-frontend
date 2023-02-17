import useCabins from '@/hooks/useCabins'
import useReservations from '@/hooks/useReservations'
import { correctDate, dayName, formatDate } from '@/utils/formatDate'
import React, { useState } from 'react'
import ReservCard from './panelComponents/ReservCard'
import Tile from './panelComponents/Tile'

const ReservationsPanel = ({ DAYS = 30 }) => {
    const { reservations } = useReservations()

    //: creo un objeto base con un array para cada cabaña
    const { cabins } = useCabins()
    const template = {}
    cabins.map(c => template[c.id] = [])


    const nextDay = (i) => {
        const d = new Date(i)
        return new Date(new Date(d).setDate(d.getDate() + 1))
    }

    //: TODO: REFACTOR, se repite en CalendarMiniCabinCard
    const overlaped = (date, IN, OUT) => {
        const X = new Date(date),
            A = new Date(IN),
            B = new Date(OUT)

        if (X >= A && X < B) {
            return true
        } else return false
    }

    const checkinToday = (date, IN) => {
        const X = new Date(date),
            A = new Date(IN),
            today = new Date(new Date().toLocaleDateString('en'))

        if (A < today && X.getTime() === today.getTime()) {
            return 'pre'
        } else if (X.getTime() === A.getTime()) {
            return true
        } else return false
    }

    // finalDate define hasta donde va a llegar la tabla
    const finalDate = new Date(new Date().setDate(new Date().getDate() + DAYS))
    let dates = []

    for (let i = new Date(new Date().toLocaleDateString('en')); i < finalDate; i = nextDay(i)) {
        //: guardo fechas de la cabecera
        const date = formatDate(i)
        dates.push(i)

        //: en cada cabaña del objeto base, agrego la fecha del día
        for (const key in template) {
            if (Object.hasOwnProperty.call(template, key)) {
                const prop = template[key];

                let aux = { date: i }

                //: busca una reserva que coincida con la fecha actual (i)
                const R = reservations.find(r => r.cabin.id === key && overlaped(date, r.checkin, r.checkout))
                if (R) {
                    let reserv = {
                        id: R.id,
                        nights: R.nights,
                        pax: R.persons,
                        name: R.client.name,
                        nationality: R.client.nationality,
                        checkin: false,
                        checkout: false
                    }
                    reserv.checkin = checkinToday(date, R.checkin)

                    if (reserv.checkin === 'pre') {
                        const OUT = new Date(R.checkout).getDate(),
                            today = new Date(i.toLocaleDateString('en')).getDate(),
                            nightsLeft = OUT - today + 0.5
                        reserv.nights = nightsLeft
                    }

                    aux = { ...aux, reserv }
                }

                prop.push(aux)
            }
        }

    }

    const [selectMode, setSelectMode] = useState(false)
    const [start, setStart] = useState(false)
    const [end, setEnd] = useState(false)

    const clickDown = (date) => {
        setSelectMode(() => true)
        setStart(() => date)
    }

    const clickUp = () => {
        if (selectMode) {
            setSelectMode(() => false)
            //: TODO: falta enviar fechas al form de reservas y LISTO :)
            console.log(`%c 📆 Crear reserva desde ${correctDate(start)} al ${correctDate(end)} `, 'background-color: #0ea5e9; color: #ffffff; font-weight: bold;');
        }
    }

    const mouseEnter = (date) => {
        // si se selecciona hacia atras, se desactiva el modo
        if (date < start) setSelectMode(() => false)
        setEnd(() => date)
    }

    const frontierPolice = () => {
        // checkea si el mouse se fue a la fila de otra cabaña
        selectMode && setSelectMode(() => false)
    }

    return (
        <section className='flex w-full overflow-x-auto'>

            <div className='tc'>
                <div className='rounded-tl-xl border-t border-slate-700'>
                    <p>Cabañas</p>
                </div>
                {Object.entries(template).map(c => (
                    <div key={c[0]} className='ellipsis'>
                        <p>{cabins.find(cab => cab.id === c[0])?.name}</p>
                    </div>
                ))}
            </div>

            <div>
                <div className='tr bg-slate-900 border-t border-slate-700'>
                    {dates.map(d => (
                        <div key={d} className={`bg-slate-800/30 flex-col px-4 ${d.getDate() === 1 ? 'bg-blue-500/20' : ''}`}>
                            <p className='capitalize'>{dayName(d)}</p>
                            <p className='dark:text-gray-400'>{correctDate(d)}</p>
                        </div>
                    ))}
                </div>

                {Object.entries(template).map(c => (
                    <div key={c[0]} id={c[0]} className='tr select-none' onMouseEnter={frontierPolice}>
                        {c[1].map(tile => (
                            <div key={c[0] + tile.date} className={`${tile.date.getDate() === 1 ? 'bg-blue-500/10' : ''}`}
                                onMouseDown={() => clickDown(tile.date)}
                                onMouseUp={() => clickUp()}>

                                {/* {tile?.reserv ? '@' : '·'} */}
                                {tile?.reserv?.checkin && <ReservCard data={tile.reserv} />}

                                <Tile mode={selectMode} disabled={tile?.reserv && !tile?.reserv?.checkin} cb={() => mouseEnter(tile.date)} />
                                <Tile mode={selectMode} disabled={tile?.reserv} cb={() => mouseEnter(tile.date)} />

                                {/* <div className={`h-full w-1/2 hover:bg-slate-500/20`}
                                    onMouseEnter={() => setEnd(() => tile.date)}></div>
                                <div className={`${tile?.reserv ? 'pointer-events-none' : ''} h-full w-1/2 hover:bg-slate-500/20`}
                                    onMouseEnter={() => setEnd(() => tile.date)}></div> */}

                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </section>
    )
}

export default ReservationsPanel