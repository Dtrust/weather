import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCitiesList, getUserIP, getUserLocation } from '../../api/userApi';
import { IUser } from './types';

export const fetchUserIP = createAsyncThunk('users/fetchUserIP', async () => {
    const data = await getUserIP();
    const ip = data ? data : '';
    return { ip } as IUser;
});

export const fetchUserLocation = createAsyncThunk(
    'users/fetchUserLocation',
    async (_, { dispatch }) => {
        const ip = (await dispatch(fetchUserIP()).then(res => {
            try {
                const { ip } = res.payload as IUser;
                return ip;
            } catch (e) {
                return e;
            }
        })) as string;

        const data = await getUserLocation(ip);
        const country_code = data ? data.country_code : '';
        const city = data ? data.city : '';

        return { country_code, city } as IUser;
    }
);

export const fetchCitiesList = createAsyncThunk(
    'users/fetchCitiesList',
    async (query: string) => {
        return await getCitiesList(query);
    });
