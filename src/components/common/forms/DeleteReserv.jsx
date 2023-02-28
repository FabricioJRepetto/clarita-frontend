import React, { useState } from 'react'
import Switch from '../misc/Switch'

const DeleteReserv = ({ handleDelete, close }) => {
    const [remove, setRemove] = useState(false)
    return (
        <div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                <p className='text-xl'>¿Seguro deseas eliminar esta reserva?</p>
                <p>Esta acción es <b>irreversible</b>.</p>
            </span>

            <span className='col-span-4'>
                <p>¿Borrar los pagos de los registros contables?</p>
                <Switch options={['mantener', 'borrar']} cb={() => setRemove(!remove)} />
            </span>

            <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>
            <button type='submit' onClick={() => handleDelete(remove)} className="btn-admin-p col-span-2">Continuar</button>

            {/* {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>} */}
        </div>
    )
}

export default DeleteReserv