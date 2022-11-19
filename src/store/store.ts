import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import user from './user/slice';
import currentWeather from './currentWeather/slice';
import forecastWeather from './forecastWeather/slice';

export const store = configureStore({
    reducer: {
        user,
        currentWeather,
        forecastWeather,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAPPDispatch = () => useDispatch<AppDispatch>();
