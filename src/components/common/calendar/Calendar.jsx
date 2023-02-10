import React from 'react'

const Calendar = () => {
    const today = new Date()
    const firstDay = new Date(`${today.getUTCMonth() + 1}/1/${today.getUTCFullYear()}`).getUTCDay()
    const mm = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']



    return (
        <section>
            <h1>Calendario</h1>
            <section className='grid grid-cols-7 gap-2'>
                <div className='h-16 aspect-square border border-slate-200 dark:border-slate-700 rounded-lg'></div>
            </section>
        </section>
    )
}

export default Calendar