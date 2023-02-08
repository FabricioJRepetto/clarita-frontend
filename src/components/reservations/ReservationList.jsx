import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ReservationList = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div>
            {data.map(e => (
                <div key={e.id} className='p-2 my-1 border border-slate-300 dark:border-slate-700 rounded-lg'>
                    <p>Cliente: {e?.client?.name || '?'}</p>
                    <p>Cabaña: {e?.cabin?.name || '?'}</p>
                    <p>checkin: {e.checkin}, checkout: {e.checkout}</p>
                    <i>id: {e.id}</i>
                    <br />
                    <button onClick={() => navigate(`/reservations/details/${e.id}`)} className='btn-primary'>ver</button>
                </div>
            ))}
        </div>
    )
}
