import React from 'react'

const Statistics = () => {
    return (
        <div>
            <h1>Informes</h1>

            <section>
                <select >

                </select>
            </section>
        </div>
    )
}

export default Statistics

/*    
    _Gráfico de ingresos Mensuales/Diarios: 
            Ledger: total 
        _Ingresos en monedas extrangeras

    _Reservas registradas este Mes: 
            Reservation: createdAt
        _Promedio de Reservas Mensuales

    _Hospedajes este Mes: 
            Reservation: checkin
        _Total de Huespedes este Mes: 
                Reservation: persons
        _Total generado por reservas: 
                Ledger: entries con ID de reserva
        _Promedio de Hospedajes Mensuales
*/