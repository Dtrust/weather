import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from './types';

import './ThemeSwitcher.sass'

export const ThemeSwitcher: React.FC = () => {
    
    const storageTheme = localStorage.getItem('weather-theme') as Theme
    
    const [theme, handleChange] = useTheme(storageTheme ? storageTheme : 'dark');
    
    
    return (
        <label className='header-switch switch'>
            <input className='visually-hidden switch-input' type='checkbox' onChange={handleChange} checked={theme === 'light'}/>
            <DarkModeSwitch
                className='switch-icon'
                onChange={handleChange as unknown as (checked: boolean) => void}
                checked={theme === 'light'} size={20}
            />
            <span className='switch-slider'/>
        </label>
    );
}
