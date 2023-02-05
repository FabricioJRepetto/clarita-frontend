import { useEffect } from "react"
import { useGlobal } from "../globalContext"

export const useTheme = () => {
    const { dispatch } = useGlobal()

    useEffect(() => {
        console.log('useTheme: me ejecuto 2 veces :)')
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            // document.documentElement.classList.add('dark')
            dispatch({ type: 'theme', payload: 'dark' })
        } else {
            // document.documentElement.classList.remove('dark')
            dispatch({ type: 'theme', payload: 'light' })
        }
        // eslint-disable-next-line
    }, [])
}
