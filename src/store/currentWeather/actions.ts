import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../user/types';
import { currentAPI } from '../../api/weatherApi';

export const fetchCurrentWeather = createAsyncThunk(
    'current/fetchCurrent',
    async (_, { getState }) => {
        const { user } = (await getState()) as { user: IUser };

        const { data } = await currentAPI(user);

        return data;
    }
);
