import React, { useState } from 'react'
import useLogin from '@/hooks/useLogin';

const LoginScreen = () => {
    const [userData, setUserData] = useState(null)
    const { user, isError, isLoading } = useLogin(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        const [{ value: email }, { value: password }] = e.target
        setUserData(() => ({ email, password }))
    }

    return (
        <div className='flex-1 w-full -mt-40 flex flex-col justify-center'>

            <div className='w-full md:w-1/2 lg:w-1/4 h-fit m-auto flex flex-col gap-2'>

                <h1 className='text-center text-8xl my-8 logo-font'>Cabañas Clarita</h1>

                {isLoading && <h3>Cargando...</h3>}
                {(!isLoading) &&
                    <>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <input required type="email" className='text-black' />
                            <input required type="password" className='text-black' />
                            {isError && <p className='text-red-400'>{isError?.message || ''}</p>}
                            {isLoading ? <p>iniciando sesión</p>
                                : <>
                                    <p onClick={() => console.log('cambiando contraseña')} className='btn-tertiary text-center cursor-pointer'>recuperar contraseña</p>
                                    <button type="submit" className='btn-primary'>Log in</button>

                                    <button className='btn-tertiary'>crear cuenta</button>
                                </>}
                        </form>
                    </>}
                {user?.user_name && <p className='text-center'>{`Bienvenido ${user.user_name}`}</p>}
            </div>
        </div>
    )
}

export default LoginScreen