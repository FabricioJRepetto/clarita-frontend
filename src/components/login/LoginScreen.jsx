import React, { useEffect, useState } from 'react'
import useLogin from '@/hooks/useLogin';
import { mutate } from 'swr';
import { login, postApi } from '@/services/api';
import Login from './Login';
import Signin from './Signin';
import Password from './Password';

const LoginScreen = () => {
    const [frame, setFrame] = useState(0)
    const [error, setError] = useState(false)
    const { user, error: hookError, isLoading, reLog } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(() => false)
        const [{ value: email }, { value: password }] = e.target,
            data = { email, password };

        const user_data = await login(data)

        if (!user_data.error) {
            reLog(['/user/login', user_data.token])
        } else {
            setError(() => user_data.error)
        }
    }

    const handlePW = async (e) => {
        e.preventDefault()
        setError(() => false)

        const [{ value: email }] = e.target,
            data = { email };

        try {
            // POST /user/forgotPassword {email}
            const res = await postApi(['/user/forgotPassword', data])
            console.log(res);
        } catch (err) {
            console.warn(err?.response?.data?.error);
            // setError(() => err?.response?.data?.error || err?.message || 'Algo salió mal')
        }
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        setError(() => false)

        const [{ value: user_name }, { value: email }, { value: password }] = e.target,
            data = { user_name, email, password };

        try {
            // POST /user/signin {user_name, email, password}
            // const res = await postApi('/user/signin', data)
            // console.log(res);
        } catch (err) {
            console.warn(err?.response?.message);
            setError(() => err?.response?.message || 'Algo salió mal')
        }
    }

    const back = () => setFrame(() => 0)

    const changePassword = () => {
        setError(() => false)
        setFrame(() => 2)
    }

    const createAccount = () => {
        setError(() => false)
        setFrame(() => 1)
        console.log('POST /user/signin {user_name, email, password}')
    }

    const frames = [
        <Login handler={handleSubmit} error={error} password={changePassword} signIn={createAccount} />,
        <Signin handler={handleSignin} back={back} error={error} />,
        <Password handler={handlePW} back={back} />
    ]
    const correctFrame = frames[frame]

    return (
        <div className='flex-1 w-full -mt-40 flex flex-col justify-center'>
            <div className='w-full md:w-1/2 lg:w-1/4 h-fit m-auto flex flex-col gap-2'>

                <h1 className='text-center text-8xl my-8 logo-font'>Cabañas Clarita</h1>

                {user?.user_name && <p className='text-center'>{`Bienvenido ${user.user_name}`}</p>}

                {(!isLoading)
                    ? correctFrame
                    : <h3>Cargando...</h3>}
            </div>
        </div>
    )
}

export default LoginScreen