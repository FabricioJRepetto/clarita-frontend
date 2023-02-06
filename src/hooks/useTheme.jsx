import { useEffect } from "react"

export const useTheme = () => {

    useEffect(() => {
        console.log('useTheme: me ejecuto 2 veces :)')
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])
}
