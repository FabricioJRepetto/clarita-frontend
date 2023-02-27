import LedgerForm from '@/components/common/forms/LedgerForm'
import { correctDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import React, { useState } from 'react'
import { MdArrowDownward, MdArrowUpward, MdMoreVert, MdMode, MdDelete } from 'react-icons/md'

const EntryCard = ({ data, deleteEntry, date = true }) => {
    const gain = data?.entryType === 'income'
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const edit = (e) => {
        e.stopPropagation()
        setOpen(() => false)
        setEditMode(() => true)
    }
    const deleteHandler = (e) => {
        e.stopPropagation()
        setOpen(() => false)
        deleteEntry(data.date, data._id)
    }

    return (
        <>
            {editMode
                ? <LedgerForm edit={data} close={() => setEditMode(() => false)} />
                : <div className={`ledger-row grid-cols-8 fade-in ${open ? 'z-10' : ''}`}>

                    {date &&
                        <div className='col-span-1'>
                            {correctDate(data?.date)}
                        </div>}

                    <div className={`col-span-1 flex items-center ${gain ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {gain
                            ? <><MdArrowUpward /> <p className='uppercase pl-2 text-xs'>ingreso</p></>
                            : <><MdArrowDownward /> <p className='uppercase pl-2 text-xs'>perdida</p></>}
                    </div>

                    <div className={`ellipsis ${date ? 'col-span-4' : 'col-span-5'}`}>
                        {data?.description}
                    </div>

                    <div className='relative col-span-1 text-right text-gray-500'>
                        {data?.currency !== 'ARS'
                            ? <>
                                <span className={`absolute top-3 right-12 h-2 w-2 flex items-center bg-rose-500 rounded-full`}>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-90"></span>
                                </span>
                                <>{data?.currency}</>
                            </>
                            : <>{data?.currency}</>
                        }
                    </div>

                    <div className={`col-span-1 ${gain ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {gain ? '+' : '-'}
                        {numberToCurrency(data?.amount)}
                    </div>

                    <button className='btn-icon absolute right-3 top-2' onClick={() => setOpen(true)}><MdMoreVert /></button>

                    {open &&
                        <section onMouseLeave={() => setOpen(false)}
                            className='absolute -right-2 top-2 w-fit h-fit py-2 border border-slate-400 dark:border-slate-700 rounded-md bg-neutral-100 dark:bg-slate-900'>
                            <p onClick={edit}
                                className='txt-n-icon cursor-pointer px-4 py-1 w-full hover:bg-gray-300 hover:dark:bg-slate-800'>
                                <MdMode />
                                editar
                            </p>

                            <p onClick={deleteHandler}
                                className='txt-n-icon cursor-pointer px-4 py-1 w-full hover:bg-gray-300 hover:dark:bg-slate-800'>
                                <MdDelete />
                                eliminar
                            </p>

                        </section>}
                </div>
            }
        </>
    )
}

export default EntryCard