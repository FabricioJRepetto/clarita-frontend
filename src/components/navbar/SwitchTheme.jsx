import React, { useEffect, useState } from 'react'
import Switch from '../common/Switch'
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { toggleTheme } from '@/utils/toggleTheme';
import { useLocation } from 'react-router-dom';

const SwitchTheme = () => {
    // const { } = useLocation()
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        if (localStorage.theme === 'light') setTheme(true)
        else setTheme(false)
    }, [])

    const handleToggle = () => {
        toggleTheme()
        setTheme(!theme)
    }

    return (
        <div>
            {theme !== null &&
                <Switch options={[<MdDarkMode />, <MdLightMode />]}
                    state={theme} cb={handleToggle} />}
        </div>
    )
}

export default SwitchTheme