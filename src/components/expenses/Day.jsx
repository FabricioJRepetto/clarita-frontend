import useLedger from '@/hooks/useLedger'
import React, { useMemo } from 'react'
import Loading from '../common/misc/Loading'
import LedgerPage from './components/LedgerPage'

const Day = ({ date }) => {
    const { week, isLoading, mutate } = useLedger(date)

    const time = new Date(date).toLocaleDateString('en')
    const today = useMemo(() => week ? week[time] : [], [week, time])

    return (
        <div className='h-full fade-in flex flex-col gap-4'>
            {isLoading &&
                <div className='relative h-1 mb-2'>
                    <span className='loading-container'>
                        <Loading />
                    </span>
                </div>}

            <LedgerPage data={today} mutate={mutate} date={date} editEnable={true} />

        </div>
    )
}

export default Day