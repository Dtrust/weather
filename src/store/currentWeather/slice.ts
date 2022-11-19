import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentWeather } from './actions';
import { ICurrentWeather } from './types';
import { StatusEnum } from '../types';

const initialState: ICurrentWeather = {
    current: {
        condition: {
            icon: '',
            text: '',
        },
        temp_c: 0,
        feelslike_c: 0,
        wind_dir: '',
        wind_kph: 0,
        pressure_mb: 0,
        humidity: 0,
    },
    currentWeatherStatus: StatusEnum.LOADING,
};

const currentSlice = createSlice({
    name: 'currentWeather',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            fetchCurrentWeather.pending,
            (state: ICurrentWeather) => {
                state.currentWeatherStatus = StatusEnum.LOADING;
            }
        );
        builder.addCase(
            fetchCurrentWeather.fulfilled,
            (state, action: PayloadAction<ICurrentWeather>) => {
                state.current = action.payload.current;
                state.currentWeatherStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(fetchCurrentWeather.rejected, state => {
            state.currentWeatherStatus = StatusEnum.ERROR;
        });
    },
});

export default currentSlice.reducer;
