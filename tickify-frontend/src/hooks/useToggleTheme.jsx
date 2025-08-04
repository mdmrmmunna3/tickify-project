import React, { useEffect, useState } from 'react';

const useToggleTheme = () => {
    // state managed 
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('light');
            setIsDarkMode(false);
        }
    }, [])

    // make a event handler for toggleThemeHandeler 
    const handleToggleTheme = () => {
        const darkModeEnabled = document.documentElement.classList.toggle('dark')
        localStorage.setItem('theme', darkModeEnabled ? 'dark' : 'light');
        setIsDarkMode(darkModeEnabled);
    }

    return [isDarkMode, handleToggleTheme];
};

export default useToggleTheme;