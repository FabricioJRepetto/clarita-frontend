import { Route, Routes } from 'react-router-dom';
import Home from '@/components/home/Home';
import LoginScreen from '@/components/login/LoginScreen';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/navbar/Navbar';
import useUser from '@/hooks/useUser';
import Clients from '@/components/clients/Clients';
import Reservations from '@/components/reservations/Reservations';

function App() {
    //! DANGER: possible troublemaker
    const { user, error } = useUser()

    useTheme()

    return (
        <div className="min-w-screen min-h-screen px-4 flex flex-col py-40">
            {(!user || error) && <LoginScreen />}
            {user &&
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/clients" element={<Clients />} />
                        <Route path="/reservations" element={<Reservations />} />
                    </Routes>
                </>
            }
        </div>
    )
}

export default App
