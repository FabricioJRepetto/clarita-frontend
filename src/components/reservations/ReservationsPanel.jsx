import useCabins from '@/hooks/useCabins'
import useReservations from '@/hooks/useReservations'
import { correctDate, formatDate } from '@/utils/formatDate'
import React from 'react'
import ReservCard from './panelComponents/ReservCard'

const ReservationsPanel = ({ DAYS = 30 }) => {
    const { reservations } = useReservations()

    //: creo un objeto base con un array para cada cabaña
    const { cabins } = useCabins()
    const template = {}
    cabins.map(c => template[c.id] = [])

    const finalDate = new Date(new Date().setDate(new Date().getDate() + DAYS))

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

    let dates = []

    for (let i = new Date(); i < finalDate; i = nextDay(i)) {
        //: guardo fechas de la cabecera
        const date = formatDate(i)
        dates.push(correctDate(i))

        //: en cada cabaña del objeto base, agrego la fecha del día
        for (const key in template) {
            if (Object.hasOwnProperty.call(template, key)) {
                const prop = template[key];

                let aux = { date: date }

                //: busca una reserva que coincida con la fecha actual (i)
                const R = reservations.find(r => r.cabin.id === key && overlaped(date, r.checkin, r.checkout))
                if (R) {
                    let reserv = {
                        id: R.id,
                        nights: R.nights,
                        pax: R.persons,
                        name: R.client.name,
                        nationality: R.client.nationality,
                        checkin: false
                    }
                    reserv.checkin = checkinToday(date, R.checkin)

                    if (reserv.checkin === 'pre') {
                        const OUT = new Date(R.checkout).getDate(),
                            today = new Date(i.toLocaleDateString('en')).getDate(),
                            nightsLeft = OUT - today - 0.5

                        reserv.nights = nightsLeft
                    }

                    aux = { ...aux, reserv }
                }

                prop.push(aux)
            }
        }

    }

    // console.log(month);

    return (
        <section className='w-screen overflow-x-auto'>
            <div className='tr'>
                <div>Cabañas</div>
                {dates.map(d => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {Object.entries(template).map(c => (
                <div key={c[0]} className='tr'>
                    <div className='ellipsis'>{cabins.find(cab => cab.id === c[0])?.identifier}</div>

                    {c[1].map(tile => (
                        <div key={c[0] + tile.date}>
                            {tile?.reserv ? '@' : '·'}
                            {tile?.reserv?.checkin && <ReservCard data={tile.reserv} />}
                        </div>
                    ))}

                </div>
            ))}
        </section>
    )
}

export default ReservationsPanel