import { fancyDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import React from 'react'

const ReservPreview = ({ preview, client, cabin, handler }) => {
    return (
        <div className='grid gap-2'>
            <section>
                <p>Cliente: <b>{client}</b></p>
            </section>

            <section>
                <p>Fechas: (<b>{preview.nights}</b> {preview.nights > 1 ? 'noches' : 'noche'})</p>
                <p className='ml-2'>checkin: <b>{fancyDate(preview.checkin)}</b></p>
                <p className='ml-2'>checkout: <b>{fancyDate(preview.checkout)}</b></p>
                <p>Cabaña: {cabin}</p>
                <p>Personas: {preview.persons}</p>
            </section>

            <section>
                <p>Pago:</p>
                <p className='ml-2'>forma: <b>{preview.paymentType}</b></p>
                <p className='ml-2'>monto: <b>{numberToCurrency(preview.amount)}</b></p>
                {preview.fees !== '-' && <p>cuotas: <b>{preview.fees}</b></p>}
                {preview.percentage !== '-' && <p>Adelanto del <b>%{preview.percentage}</b></p>}
            </section>

            <p>Notas: {preview.notes}</p>
            <button onClick={handler} className='btn-primary'>Crear Reserva</button>
        </div>
    )
}

export default ReservPreview