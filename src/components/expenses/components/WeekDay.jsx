import { numberToCurrency } from '@/utils/formUtils';
import React from 'react'
import { getBalance } from '../utils/getBalance'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'

const WeekDay = ({ name, data: { data, currency }, date, setDate, day }) => {
    const { total } = getBalance(data)

    const today = new Date().toLocaleDateString('en')

    return (
        <div onClick={() => setDate(date)}
            className={`h-20 px-4 py-1 my-6 relative gradient cursor-pointer hover:brightness-125 ${date === today ? 'dark:border-slate-500' : ''} ${day === date ? 'border-blue-500 dark:border-blue-500' : ''}`}>

            {currency &&
                <span className={`absolute top-3 right-3 h-2 w-2 flex items-center bg-rose-500 rounded-full`}>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90"></span>
                </span>}

            <p>{name}</p>
            <p className='text-sm text-gray-500'>{date || ''}</p>

            {!!data.length
                ? <>
                    <div className={`font-semibold txt-n-icon justify-between ${total < 0 ? 'text-rose-500' : total > 0 ? 'text-emerald-500' : ''}`}>
                        {total < 0 ? <MdArrowDownward /> : total > 0 ? <MdArrowUpward /> : ''}
                        <p>{(total < 0 ? '-' : '') + numberToCurrency(total)}</p>
                    </div>
                </>
                : <p className='text-xs text-gray-500 uppercase'>sin registros</p>
            }
        </div>
    )
}

export default WeekDay