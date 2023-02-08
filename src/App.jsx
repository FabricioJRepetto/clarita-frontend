import { Route, Routes } from 'react-router-dom';
import Home from '@/components/home/Home';
import LoginScreen from '@/components/login/LoginScreen';
import { useTheme } from '@/hooks/useTheme';
import Navbar from '@/components/navbar/Navbar';
import useUser from '@/hooks/useUser';
import Clients from '@/components/clients/Clients';
import Reservations from '@/components/reservations/Reservations';
import NotFound from '@/components/NotFound';
import ClientDetails from '@/components/clients/ClientDetails';
import CreateClient from '@/components/clients/CreateClient';
import CreateReservation from '@/components/reservations/CreateReservation';
import ReservationDetails from './components/reservations/ReservationDetails';

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
                        <Route path="/clients/create" element={<CreateClient />} />
                        <Route path="/clients/edit/:id" element={<CreateClient />} />
                        <Route path="/clients/details/:id" element={<ClientDetails />} />

                        <Route path="/reservations" element={<Reservations />} />
                        <Route path="/reservations/create" element={<CreateReservation />} />
                        <Route path="/reservations/edit/:id" element={<Reservations />} />
                        <Route path="/reservations/details/:id" element={<ReservationDetails />} />

                        <Route path="/cabins" element={<Reservations />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </>
            }
        </div>
    )
}

export default App
