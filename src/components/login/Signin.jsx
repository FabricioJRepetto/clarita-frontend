import React from 'react'

const Signin = ({ back }) => {
    return (
        <div>
            <div>
                <h1>Crear cuenta</h1>
                <button type='button' className='btn-secondary' onClick={back}>volver</button>
            </div>
        </div>
    )
}

export default Signin