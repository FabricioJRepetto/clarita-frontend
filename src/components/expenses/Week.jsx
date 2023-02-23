import React from 'react'

const Week = () => {
    return (
        <div className='grid gap-4'>
            <p>Semana: Resumen de la semana, opción de nuevo registro.</p>

            <section className='grid grid-cols-7 gap-2'>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Domingo
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Lunes
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Martes
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Miercoles
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Jueves
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Viernes
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
                <div className='h-24 border rounded-md px-4 py-2'>
                    Sabado
                    <p>ingresos</p>
                    <p>gastos</p>
                </div>
            </section>

            <section>
                <div className='txt-n-icon justify-between border px-4 py-2'>
                    <p className='text-xl'>Gastos hoy</p>
                    <button className="btn-primary">Registrar</button>
                </div>
                <p>---</p>
                <p>---</p>
                <p>---</p>
                <p>---</p>

            </section>
        </div>
    )
}

export default Week