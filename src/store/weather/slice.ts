import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeather } from './actions';
import { IWeather, StatusEnum } from './types';

const initialState: IWeather = {
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
    forecast: [],
    weatherStatus: StatusEnum.LOADING,
};

const weatherSlice = createSlice({
    name: 'current',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchWeather.pending, (state: IWeather) => {
            state.weatherStatus = StatusEnum.LOADING;
        });
        builder.addCase(
            fetchWeather.fulfilled,
            (state, action: PayloadAction<IWeather>) => {
                state.current = action.payload.current;

                //ToDo need fix this

                // @ts-ignore
                state.forecast = action.payload.forecast.forecastday;
                state.weatherStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(fetchWeather.rejected, state => {
            state.weatherStatus = StatusEnum.ERROR;
        });
    },
});

export default weatherSlice.reducer;
