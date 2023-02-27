import React from 'react'
import { getDay } from '../utils/getDay'

const LedgerWeek = ({ data }) => {

    return (
        <section className='grid grid-cols-7 gap-2'>

            <div className='h-24 border rounded-md px-4 py-2'>
                Lunes
                <p>{getDay(1, data)?.date}</p>
                <p>ingresos</p>
                <p>gastos</p>
            </div>
            <div className='h-24 border rounded-md px-4 py-2'>
                Martes
                <p>{getDay(2, data)?.date}</p>
                <p>ingresos</p>
                <p>gastos</p>
            </div>
            <div className='h-24 border rounded-md px-4 py-2'>
                Miercoles
                <p>{getDay(3, data)?.date}</p>
                <p>ingresos</p>
                <p>gastos</p>
            </div>
            <div className='h-24 border rounded-md px-4 py-2'>
                Jueves
                <p>{getDay(4, data)?.date}</p>
                <p>ingresos</p>
                <p>gastos</p>
            </div>
            <div className='h-24 border rounded-md px-4 py-2'>
                Viernes
                <p>{getDay(5, data)?.date}</p>
                <p>ingresos</p>
                <p>gastos</p>
            </div>
            <div className='h-24 border rounded-md px-4 py-2'>
                Sabado
                <p>{getDay(6, data)?.date}</p>
                <p>ingresos</p>
                <p>gastos</p>
            </div>
            <div className='h-24 border rounded-md px-4 py-2'>
                Domingo
                <p>{getDay(0, data)?.date}</p>
                <p>ingresos</p>
                <p>gastos</p>
            </div>

        </section>
    )
}

export default LedgerWeek