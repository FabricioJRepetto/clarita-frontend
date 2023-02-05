import React, { useState } from 'react'
import { useGlobal } from '../../globalContext'
import { submitLogin } from '../../services/api'

const LoginScreen = () => {
    const {
        dispatch,
        state: {
            g_loading,
            session
        }
    } = useGlobal()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        submitLogin(email, password)
    }

    return (
        <div className='flex-1 w-full flex flex-col justify-center'>

            <div className='w-full md:w-1/2 lg:w-1/4 h-fit m-auto flex flex-col gap-4'>

                <h1 className='text-center my-8'>Logo</h1>

                <form onSubmit={handleSubmit}
                    className='flex flex-col gap-4'>
                    <input required type="email" value={email}
                        onChange={e => setEmail(e.target.value)} className='text-black' />
                    <input required type="password" value={password}
                        onChange={e => setPassword(e.target.value)} className='text-black' />

                    <p onClick={() => console.log('cambiando contraseña')} className='text-center underline decoration-solid underline-offset-4'>recuperar contraseña</p>
                    <button type="submit">Log in</button>
                </form>

                <button>crear cuenta</button>
            </div>
        </div>
    )
}

export default LoginScreen