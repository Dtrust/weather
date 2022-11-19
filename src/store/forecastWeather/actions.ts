import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../user/types';
import { forecastAPI } from '../../api/weatherApi';

export const fetchForecastWeather = createAsyncThunk(
    'forecast/fetchForecast',
    async (_, { getState }) => {
        const { user } = (await getState()) as { user: IUser };

        const { data } = await forecastAPI(user);

        return data;
    }
);
