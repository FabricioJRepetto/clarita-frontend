import React, { useState } from 'react'
// import { useGlobal } from '@/globalContext.jsx'
import useAutoLogin from '@/hooks/useAutoLogin';
import useUser from '@/hooks/useUser';

const LoginScreen = () => {
    const [userData, setUserData] = useState(false)
    const { aUser, aError, aLoading } = useAutoLogin()
    const { user, isError, isLoading } = useUser(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        const [{ value: email }, { value: password }] = e.target
        setUserData(() => ({ email, password }))
    }

    return (
        <div className='flex-1 w-full flex flex-col justify-center'>

            <div className='w-full md:w-1/2 lg:w-1/4 h-fit m-auto flex flex-col gap-4'>

                <h1 className='text-center my-8'>Logo</h1>

                {aLoading && <h3>Cargando...</h3>}
                {(!aLoading && aError) &&
                    <>
                        <form onSubmit={handleSubmit}
                            className='flex flex-col gap-4'>
                            <input required type="email" className='text-black' />
                            <input required type="password" className='text-black' />

                            <p>{isLoading ? 'iniciando sesión' : ''}</p>
                            <p className='text-red-400'>{isError?.message || ''}</p>

                            <p onClick={() => console.log('cambiando contraseña')} className='text-center underline decoration-solid underline-offset-4'>recuperar contraseña</p>
                            <button type="submit">Log in</button>
                        </form>

                        <button>crear cuenta</button>
                    </>}
                {(aUser?.user_name || user?.user_name) && <p className='text-center'>{`Bienvenido ${aUser.user_name || user.user_name}`}</p>}
            </div>
        </div>
    )
}

export default LoginScreen