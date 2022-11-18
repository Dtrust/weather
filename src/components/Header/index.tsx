import React from 'react';

import { ThemeSwitcher } from '../ThemeSwitcher';

import './Header.sass'


export const Header: React.FC = () => {
	return (
		<header className='header'>
			<div className='container header-content'>
				<h1 className='header-title'>Weather App</h1>
				<ThemeSwitcher/>
			</div>
		</header>
	);
}
