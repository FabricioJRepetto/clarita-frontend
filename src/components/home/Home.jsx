import React from 'react'
import useUser from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    //: TODO: create a different hook for user and login
    const { user, isLoading, error, setUser } = useUser()
    const navigate = useNavigate()

    return (
        <div>
            <article className='max-w-7xl m-auto'>
                <p>{user.id}</p>
                <p>{user.email}</p>
                <p>{user.user_name}</p>
                <p>{user.role}</p>
                <br />
                <a href="hola" target="_blank" rel="noopener noreferrer">LINK</a>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A excepturi voluptatem commodi aspernatur sequi laudantium dicta, quae ducimus non voluptate dolorum fugit asperiores veniam possimus voluptatum tempore vitae, nihil necessitatibus.</p>

                <button className="btn-primary" onClick={() => navigate('/clients')}>clientes</button>
                <button className="btn-primary" onClick={() => navigate('/reservations')}>reservas</button>

            </article>
        </div>
    )
}

export default Home