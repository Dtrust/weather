import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchForecastWeather } from './actions';
import { ForecastItemType, IForecast } from './types';
import { StatusEnum } from '../types';

const initialState: IForecast = {
    forecastItems: [],
    initialForecastItems: [],
    forecastStatus: StatusEnum.LOADING,
};

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setInitialForecast: (state: IForecast) => {
            state.forecastItems = state.initialForecastItems;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchForecastWeather.pending, (state: IForecast) => {
            state.forecastStatus = StatusEnum.LOADING;
        });
        builder.addCase(
            fetchForecastWeather.fulfilled,
            (state: IForecast, action: PayloadAction<IForecast>) => {
                state.forecastItems = action.payload.forecast
                    ?.forecastday as unknown as ForecastItemType[];
                if (state.initialForecastItems.length === 0) {
                    state.initialForecastItems = action.payload.forecast
                        ?.forecastday as unknown as ForecastItemType[];
                }
                state.forecastStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(fetchForecastWeather.rejected, (state: IForecast) => {
            state.forecastStatus = StatusEnum.ERROR;
        });
    },
});

export const { setInitialForecast } = forecastSlice.actions;

export default forecastSlice.reducer;
