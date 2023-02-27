import useLedger from '@/hooks/useLedger'
import React, { useState } from 'react'
import Loading from '../common/misc/Loading'
import LedgerPage from './components/LedgerPage'
import LedgerWeek from './components/LedgerWeek'

const Week = ({ date }) => {
    const { week, isLoading, mutate } = useLedger(date)
    const [day] = useState(false)

    // const week = month

    return (
        <div>
            <p>Semana: resumen semanal, con entradas de cada día.</p>

            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            <LedgerWeek data={week} />

            {/* <LedgerPage month={week} mutate={mutate} date={day} /> */}


        </div>
    )
}

export default Week