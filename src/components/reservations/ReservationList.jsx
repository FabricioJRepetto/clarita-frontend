import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ReservationList = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div>
            {data.map(e => (
                <div key={e.id} className='p-2 my-1 border border-slate-300 dark:border-slate-700 rounded-lg'>
                    <p>reserva de: {e?.client?.name || '?'}</p>
                    <p>client: {e?.client || 'x'}</p>
                    <p>checkin: {e.checkin}, checkout: {e.checkout}</p>
                    <i>id: {e.id}</i>
                    <button onClick={() => navigate(`/reservations/details/${e.id}`)}>ver</button>
                </div>
            ))}
        </div>
    )
}
