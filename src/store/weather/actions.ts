import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../user/types';
import { weatherAPI } from '../../api/weatherApi';

export const fetchWeather = createAsyncThunk(
    'weather/fetchCurrentWeather',
    async (_, { getState }) => {
        const { user } = (await getState()) as { user: IUser };

        const { data } = await weatherAPI(user);

        return data;
    }
);
