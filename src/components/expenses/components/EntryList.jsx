import React from 'react'
import EntryCard from './EntryCard'

const EntryList = ({ data, deleteEntry, date = true }) => {
    return (
        <section className='entry-list'>

            {!!data?.length
                ? data.map(e => (
                    <EntryCard key={e._id} data={e} deleteEntry={deleteEntry} date={date} />
                ))
                : <div className={`ledger-row grid-cols-8 fade-in px-2`}>Sin entradas</div>
            }
        </section>
    )
}

export default EntryList