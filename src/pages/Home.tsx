import React from 'react';
import { CurrentWeather, Forecast, Header, Search } from '../components';

export const Home = () => {
    return (
        <>
            <Header />
            <Search />
            <CurrentWeather />
            <Forecast />
        </>
    );
};
