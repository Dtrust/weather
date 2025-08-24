import React from 'react';
import {
    CurrentWeather,
    Footer,
    Forecast,
    Header,
    Search,
} from '../components';
import { fetchUserLocation } from '../store/user/actions';
import { useAPPDispatch } from '../store/store';
import { fetchCurrentWeather } from '../store/currentWeather/actions';
import { fetchForecastWeather } from '../store/forecastWeather/actions';

export const Home = () => {
    const dispatch = useAPPDispatch();

    React.useEffect(() => {
        dispatch(fetchUserLocation()).then(() => {
            dispatch(fetchCurrentWeather());
            dispatch(fetchForecastWeather());
        });
    }, [dispatch]);

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
