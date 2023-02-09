import { Route, Routes } from 'react-router-dom';
import Home from '@/components/home/Home';
import LoginScreen from '@/components/login/LoginScreen';
import Navbar from '@/components/navbar/Navbar';
import useUser from '@/hooks/useUser';
import Clients from '@/components/clients/Clients';
import Reservations from '@/components/reservations/Reservations';
import NotFound from '@/components/common/NotFound';
import ClientDetails from '@/components/clients/ClientDetails';
import CreateClient from '@/components/clients/CreateClient';
import CreateReservation from '@/components/reservations/CreateReservation';
import ReservationDetails from '@/components/reservations/ReservationDetails';
import Cabins from '@/components/cabins/Cabins';
import CabinDetails from './components/cabins/CabinDetails';

function App() {
    //! DANGER: possible troublemaker
    const { user, error } = useUser()

    return (
        <div className="min-w-screen min-h-screen px-4 flex flex-col pt-24 pb-40">
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

                        <Route path="/cabins" element={<Cabins />} />
                        <Route path="/cabins/details/:id" element={<CabinDetails />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </>
            }
        </div>
    )
}

export default App
