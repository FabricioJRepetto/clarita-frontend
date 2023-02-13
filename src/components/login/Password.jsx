import React from 'react'

const Password = ({ handler, back }) => {
    return (
        <form onSubmit={handler} className='flex flex-col gap-8'>

            <label htmlFor="login-email" className='flex flex-col gap-2'>
                <p>Ingresa el email asociado a la cuenta, si es correcto, se enviará un link para cambiar la contraseña</p>
                <input placeholder='email' required type="email" id='pw-change-email' className='text-black' />
            </label>

            <section className='flex flex-col gap-2 -mt-6'>
                {/* <div className='h-6'>
                    {(error) && <p className='text-red-400'>{error || 'Hubo un error'}</p>}
                </div> */}
                <button className='btn-primary'>enviar</button>
            </section>

            <button type='button' className='btn-tertiary' onClick={back}>volver</button>
        </form>
    )
}

export default Password