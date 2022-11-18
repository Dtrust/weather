import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import weather from './weather/slice';
import user from './user/slice';


export const store = configureStore({
    reducer: {
        weather,
        user,
    },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAPPDispatch = () => useDispatch<AppDispatch>();
