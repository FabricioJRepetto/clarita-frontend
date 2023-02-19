import React, { useState } from 'react'
import useLogin from '@/hooks/useLogin';
import { login, postApi } from '@/services/api';
import Login from './Login';
import Signin from './Signin';
import Password from './Password';
import LoginMessage from './LoginMessage';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const navigate = useNavigate()
    const [frame, setFrame] = useState(0)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(false)
    const { user, isLoading, reLog } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(() => false)
        const [{ value: email }, { value: password }] = e.target,
            data = { email, password };

        const user_data = await login(data)

        if (!user_data.error) {
            reLog(['/user/login', user_data.token])
            navigate('/')
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
            const res = await postApi(['/user/forgotPassword', data])
            if (!!res?.result?.accepted.length) {
                setError(() => false)
                console.log('OK');
            } else {
                console.log('no OK', res?.error);
            }
        } catch (err) {
            console.log('no OK', err)
        } finally {
            setFrame(() => 3)
            setMessage(() => 'Si la dirección es correcta, se envió un correo para continuar con la actualización de tu contraseña.')
        }
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        setError(() => false)

        const [{ value: user_name }, { value: email }, { value: password }, { value: repeat_password }] = e.target,
            data = { user_name, email, password };

        if (password !== repeat_password) {
            setError(() => 'Las contraseñas no coinciden')
            return
        }

        try {
            const res = await postApi(['/user/signin', data])
            if (!res.error) {
                console.log(res);
                setMessage(() => 'Tu cuenta se ha creado correctamente, pero, por cuestiones de seguridad, para poder acceder a ella, primero debe ser autorizada por un administrador. Contacta con uno para continuar.')
                setFrame(() => 3)
            } else {
                setError(() => res?.error)
            }
        } catch (err) {
            console.warn(err);
            setError(() => err?.response?.message || 'Algo salió mal')
        }
    }

    const back = () => {
        setError(() => false)
        setMessage(() => false)
        setFrame(() => 0)
    }

    const changePassword = () => {
        setError(() => false)
        setMessage(() => false)
        setFrame(() => 2)
    }

    const createAccount = () => {
        setError(() => false)
        setMessage(() => false)
        setFrame(() => 1)
    }

    const frames = [
        <Login handler={handleSubmit} error={error} password={changePassword} signIn={createAccount} />,
        <Signin handler={handleSignin} back={back} error={error} />,
        <Password handler={handlePW} back={back} />,
        <LoginMessage message={message} back={back} />
    ]
    const correctFrame = frames[frame]

    return (
        user?.id
            ? <Navigate to='/' />
            : <div className='flex-1 w-full -ml-48 flex flex-col justify-center'>
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