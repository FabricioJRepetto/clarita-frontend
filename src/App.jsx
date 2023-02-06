import { Route, Routes } from 'react-router-dom';
import Home from '@/components/home/Home';
import LoginScreen from '@/components/login/LoginScreen';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/navbar/Navbar';

import useUser from './hooks/useUser';
import useSWR from 'swr'

function App() {
    //! DANGER: possible troublemaker
    //: TODO: create a different hook for user and login
    const { user, isLoading, error, setUser } = useUser()

    useTheme()

    return (

        <div className="min-w-screen min-h-screen px-4 flex flex-col pt-48">
            {(!user || error) && <LoginScreen />}
            {user &&
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </>
            }
        </div>
    )
}

export default App
