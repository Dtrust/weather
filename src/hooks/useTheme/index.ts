import React from 'react';
import { Theme, useThemeReturn, ChangeEvent } from './types';


export const useTheme = (initialTheme:Theme): useThemeReturn => {
    
    const [theme, setTheme] = React.useState<Theme>(initialTheme)
    
    const handleChange = (e: ChangeEvent) => {
        setTheme(e.target.checked ? 'light' : 'dark');
        localStorage.setItem('weather-theme', e.target.checked ? 'light' : 'dark')
    }
    
    React.useEffect(() => {
        
        const storageTheme = localStorage.getItem('weather-theme')
        
        document.body.setAttribute('data-theme', storageTheme ? storageTheme : theme);
    }, [theme])
    
    return [theme, handleChange]
}
