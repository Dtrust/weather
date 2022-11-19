import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchForecastWeather } from './actions';
import { ForecastItemType, IForecast } from './types';
import { StatusEnum } from '../types';

const initialState: IForecast = {
    forecastItems: [],
    forecastStatus: StatusEnum.LOADING,
};

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchForecastWeather.pending, (state: IForecast) => {
            state.forecastStatus = StatusEnum.LOADING;
        });
        builder.addCase(
            fetchForecastWeather.fulfilled,
            (state, action: PayloadAction<IForecast>) => {
                state.forecastItems = action.payload.forecast
                    ?.forecastday as unknown as ForecastItemType[];
                state.forecastStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(fetchForecastWeather.rejected, state => {
            state.forecastStatus = StatusEnum.ERROR;
        });
    },
});

export default forecastSlice.reducer;
