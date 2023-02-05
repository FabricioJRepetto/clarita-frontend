import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './globalContext'
import Navbar from './components/navbar/Navbar'
import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvider>
            <BrowserRouter>
                <Navbar />
                <App />
            </BrowserRouter>
        </ContextProvider>
    </React.StrictMode>
)
