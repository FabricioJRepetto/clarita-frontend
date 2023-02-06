import { login } from '@/services/api';
import React from 'react'
import useSWR from 'swr';

const Home = () => {
    //: TODO: create a different hook for user and login
    const { data } = useSWR('/user/login', login)
    return (
        <div>
            <article className='max-w-7xl m-auto'>
                <p>{data.id}</p>
                <p>{data.email}</p>
                <p>{data.user_name}</p>
                <p>{data.role}</p>
                <br />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A excepturi voluptatem commodi aspernatur sequi laudantium dicta, quae ducimus non voluptate dolorum fugit asperiores veniam possimus voluptatum tempore vitae, nihil necessitatibus.</p>
            </article>
        </div>
    )
}

export default Home