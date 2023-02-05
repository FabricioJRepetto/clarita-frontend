import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import LoginScreen from './components/login/LoginScreen';
import { useGlobal } from './globalContext'
import { useTheme } from './hooks/useTheme';

function App() {
    const {
        state: {
            session,
            g_loading
        }
    } = useGlobal();

    useTheme()

    return (
        <div className="min-w-screen min-h-screen px-4 flex flex-col">
            {!session && <LoginScreen />}
            {session && !g_loading &&
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            }

        </div>
    )
}

export default App
