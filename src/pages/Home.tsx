import React from 'react';
import {
    CurrentWeather,
    Footer,
    Forecast,
    Header,
    Search,
} from '../components';

export const Home = () => {
    return (
        <>
            <Header />
            <Search />
            <CurrentWeather />
            <Forecast />
            <Footer />
        </>
    );
};
