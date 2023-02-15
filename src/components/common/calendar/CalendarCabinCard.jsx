import React, { useState, useEffect } from 'react'
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs'

const CalendarCabinCard = ({ data, date, cb }) => {
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)

    //: TODO: REFACTOR
    //: TODO: implementar useCallback o useMemo ??
    const overlaped = (date, IN, OUT) => {
        const X = new Date(date),
            A = new Date(IN),
            B = new Date(OUT)

        if (X.getTime() === A.getTime()) {
            setCheck('IN')
        } else if (X.getTime() === B.getTime()) {
            setCheck('OUT')
        } else setCheck(false)

        if (X >= A && X < B) {
            return true
        } else return false
    }

    const datesIterator = () => {
        const list = data.reservations
        const overlap = list.find(r => overlaped(date, r.in, r.out))
        if (overlap) {
            setFree(() => false)
        } else setFree(() => true)
    }

    useEffect(() => {
        if (!!data?.reservations.length) {
            datesIterator()
        } else setFree(() => true)
        // eslint-disable-next-line
    }, [date])

    return (
        <div onClick={() => cb(data.id)} className='flex items-center px-2 w-full rounded-md bg-slate-200 dark:bg-slate-800 cursor-pointer hover:dark:bg-slate-700'>
            <b>{data?.identifier}</b>
            <div className={`flex items-center justify-center flex-grow gap-2 text-sm text-center text-ellipsis whitespace-nowrap overflow-hidden px-4 ${free ? 'text-green-300' : 'text-rose-700'}`}>
                {free ? <p>LIBRE</p> : <p>OCUPADA</p>}
                {check && <p>{check === 'IN' ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />}</p>}
            </div>
        </div>
    )
}

export default CalendarCabinCard