import React from 'react'

const DeleteReserv = ({ handleDelete, close }) => {
    return (
        <div className='relative grid grid-col grid-cols-4 gap-4 w-fit'>
            <span className='col-span-4'>
                <p>¿Seguro deseas eliminar esta reserva?</p>
                <p>Esta acción es <b>irreversible</b>.</p>
            </span>

            <button type='submit' onClick={handleDelete} className="btn-admin-p col-span-2">Continuar</button>
            <button type='button' onClick={close} className="btn-admin-s col-span-2">Cancelar</button>

            {/* {loading && <div className='absolute top-0 left-0 right-0 bottom-0 m-auto bg-black/50'>cargando</div>} */}
        </div>
    )
}

export default DeleteReserv