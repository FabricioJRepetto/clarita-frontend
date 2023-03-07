import React, { useState } from 'react'
import Stats from '@/components/expenses/components/Stats'
import IncomeChart from '@/components/expenses/components/Chart'
import useStatistics from '@/hooks/useStatistics'
import Loading from '../common/misc/Loading'

const Statistics = () => {
    const { stats, error, isLoading } = useStatistics()


    const [selectedMonth, setSelectedMonth] = useState(new Date().getUTCMonth())
    const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear())

    const monthHandler = (e) => {
        const value = e.target.value - 1
        setSelectedMonth(() => value)
    }

    return (
        <div>
            {error && <p className='text-lg'>{error?.message || 'Hubo un error'}</p>}
            {isLoading &&
                <span className='absolute w-full top-0 -mb-2'>
                    <Loading />
                </span>
            }

            <section>
                <select defaultValue={selectedMonth + 1} onChange={monthHandler}>
                    <option value={1}>Enero</option>
                    <option value={2}>Febrero</option>
                    <option value={3}>Marzo</option>
                    <option value={4}>Abril</option>
                    <option value={5}>Mayo</option>
                    <option value={6}>Junio</option>
                    <option value={7}>Julio</option>
                    <option value={8}>Agosto</option>
                    <option value={9}>Septiembre</option>
                    <option value={10}>Octubre</option>
                    <option value={11}>Noviembre</option>
                    <option value={12}>Diciembre</option>
                </select>

                <select defaultValue={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))}>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </section>

            <section className='flex flex-col mt-8'>
                <div>
                    <Stats Month={selectedMonth} Year={selectedYear} data={stats} />
                </div>

                <div>
                    <IncomeChart Month={selectedMonth} Year={selectedYear} />
                </div>

                <i className='text-xs text-gray-500 col-span-3 p-2'>*ganancias solo tomando pagos registrados en ARS</i>

            </section>

        </div>
    )
}

export default Statistics

/*    
    _Gráfico de ingresos Mensuales/Diarios: 
            :Ledger: total 
        _Ingresos en monedas extrangeras

    _Reservas registradas este Mes: 
            bookings:
            [{
                id:{mes, año},
                bookings: num
            }]
        _Promedio de Reservas Mensuales
            averageBookings

    _Hospedajes este Mes: 
            hostings:
            [{
                id:{mes, año},
                totalHostings: num,
                totalGuests: num
            }]
        _Total de Huespedes este Mes: 
            totalGuests
        _Promedio de Hospedajes Mensuales
            averageHostings
        _Total generado por reservas: 
            income:
            [{
                id:{
                    mes, //? (Enero = 0)
                    año
                },
                totalIncome: num
            }]
    
    bookings,
    averageBookings,
    hostings,
    averageHostings,
    income
*/