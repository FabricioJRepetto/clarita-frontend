import { createContext, useReducer, useContext } from 'react'
/*
    1: el creador de contexto 
        usado por el proveedor (3) y el hook (4)
    2: el reducer con las acciones 
        acciones utilizadas por los componentes. Utilizado por el proveedor (3)
    3: el proveedor del contexto 
        envuelve los componentes que necesitan acceso al contexto:

            <React.StrictMode>
                <ContextProvider>
                    <App />
                </ContextProvider>
            </React.StrictMode>

    4: el hook que da acceso al estado del contexto 
        utilizado por los componentes para acceder al contexto
*/

//? 1
export const GlobalContext = createContext()

//? 2
function reducer(state, action) {
    switch (action.type) {
        case 'theme': {
            return {
                ...state,
                theme: action.payload
            }
        }
        case 'g_loading': {
            return {
                ...state,
                g_loading: action.payload
            }
        }
        case 'session': {
            return {
                ...state,
                session: action.payload
            }
        }
        case 'user_data': {
            return {
                ...state,
                user: action.payload
            }
        }

        case 'load_data': {
            const {
                cabins,
                clients,
                reservations
            } = action.payload
            return {
                ...state,
                cabins,
                clients,
                reservations
            }
        }

        case 'cabins': {
            return {
                ...state,
                cabins: action.payload,
            }
        }
        case 'clients': {
            return {
                ...state,
                clients: action.payload,
            }
        }
        case 'reservations': {
            return {
                ...state,
                reservations: action.payload,
            }
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

//? 3
function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        theme: '',
        g_loading: true,
        session: false,
        user: {
            id: null,
            name: null,
            email: null,
            role: null
        },
        cabins: [],
        clients: [],
        reservations: []
    })
    const value = { state, dispatch }

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

//? 4
function useGlobal() {
    const context = useContext(GlobalContext)
    if (context === undefined) {
        throw new Error('useGlobal must be used within a GlobalContext')
    }
    return context
}

export { ContextProvider, useGlobal }