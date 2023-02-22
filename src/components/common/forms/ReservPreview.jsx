import { fancyDate } from '@/utils/formatDate'
import { numberToCurrency } from '@/utils/formUtils'
import React from 'react'

const ReservPreview = ({ preview, back, client, cabin, handler }) => {
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
                {!!preview?.extraPayments?.length && <p>Pago #1</p>}

                <p className='ml-2'>forma: <b>{preview.paymentType}</b></p>
                {preview.fees !== '-' && <p className='ml-2'>cuotas: <b>{preview.fees}</b></p>}
                {preview.mpDetails !== '-' && <p className='ml-2'>cuenta de MP: <b>{preview.mpDetails}</b></p>}
                <p className='ml-2'>monto: <b>{numberToCurrency(preview.amount)} </b>{preview.currency}</p>
                {(!preview.paymentStatus && preview.percentage !== '-') && <p>Adelanto del <b>%{preview.percentage}</b></p>}
            </section>

            {!!preview?.extraPayments?.length &&
                preview.extraPayments.map((e, i) => (
                    <section key={e.id}>
                        <p>Pago #{2 + i}</p>
                        <p className='ml-2'>forma: <b>{e.paymentType}</b></p>
                        {e.fees !== '-' && <p className='ml-2'>cuotas: <b>{e.fees}</b></p>}
                        {e.mpDetails !== '-' && <p className='ml-2'>cuenta de MP: <b>{e.mpDetails}</b></p>}
                        <p className='ml-2'>monto: <b>{numberToCurrency(e.amount)} </b>{e.currency}</p>
                        {(!e.paymentStatus && e.percentage) && <p>Adelanto del <b>%{e.percentage}</b></p>}
                    </section>
                ))
            }

            <section>
                <p>Pago: {preview.paymentStatus ? <b className='text-emerald-500'>Completo</b> : <b className='text-rose-500'>Incompleto</b>}</p>
                <p>Total: <b className='text-3xl'>{numberToCurrency(preview?.total) || '-'}</b></p>
            </section>

            <p>Notas: {preview.notes}</p>

            <button onClick={back} className='btn-secondary'>Volver a Editar</button>
            <button onClick={handler} className='btn-primary'>Crear Reserva</button>
        </div>
    )
}

export default ReservPreview