export const toggleTheme = () => {
    const theme = localStorage.theme

    switch (theme) {
        case 'dark':
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
            // cb({ type: 'theme', payload: 'light' })
            break;

        default:
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
            // cb({ type: 'theme', payload: 'dark' })
            break;
    }
}