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
import CabinDetails from '@/components/cabins/CabinDetails';
import CreateCabin from '@/components/cabins/CreateCabin';
import ResetPassword from '@/components/user/ResetPassword';
import Layout from '@/components/common/Layout';

function App() {
    //! DANGER: possible troublemaker
    const { user, error } = useUser()

    return (
        <div className="min-w-screen min-h-screen px-4 flex flex-col pt-24 pb-40">
            <Routes>
                <Route path='/' element={<Navbar />}>
                    {(!user?.id || error) &&
                        <Route path="/" element={<LoginScreen />} />
                    }

                    <Route path="/user/resetpassword" element={<ResetPassword />} />

                    {user?.id &&
                        <>
                            <Route path="/" element={<Home />} />

                            <Route path="clients" element={<Layout />} >
                                <Route index element={<Clients />} />
                                <Route path="create" element={<CreateClient />} />
                                <Route path="edit/:id" element={<CreateClient />} />
                                <Route path="details/:id" element={<ClientDetails />} />
                            </Route>

                            <Route path="reservations" element={<Layout />} >
                                <Route index element={<Reservations />} />
                                <Route path="create" element={<CreateReservation />} />
                                <Route path="edit/:id" element={<CreateReservation />} />
                                <Route path="details/:id" element={<ReservationDetails />} />
                            </Route>

                            <Route path="cabins" element={<Layout />} >
                                <Route index element={<Cabins />} />
                                <Route path="create" element={<CreateCabin />} />
                                <Route path="edit/:id" element={<CreateCabin />} />
                                <Route path="details/:id" element={<CabinDetails />} />
                            </Route>

                        </>
                    }

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>

        </div>
    )
}

export default App
