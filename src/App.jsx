import { Route, Routes } from 'react-router-dom';
import Home from '@/components/home/Home';
import LoginScreen from '@/components/login/LoginScreen';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/navbar/Navbar';
import { login } from '@/services/api';
import useSWR from 'swr';

function App() {
    //! DANGER: possible troublemaker
    //: TODO: create a different hook for user and login
    const { data, isLoading } = useSWR('/user/login', login)

    useTheme()

    return (

        <div className="min-w-screen min-h-screen px-4 flex flex-col pt-48">
            {isLoading && <LoginScreen />}
            {data && !isLoading &&
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
