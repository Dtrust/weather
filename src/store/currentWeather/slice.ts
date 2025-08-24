import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentWeather } from './actions';
import { ICurrentWeather } from './types';
import { StatusEnum } from '../types';

const initialState: ICurrentWeather = {
    current: {} as ICurrentWeather['current'],
    initialWeather: {} as ICurrentWeather['current'],
    currentWeatherStatus: StatusEnum.LOADING,
};

const currentSlice = createSlice({
    name: 'currentWeather',
    initialState,
    reducers: {
        setInitialWeather: (state: ICurrentWeather) => {
            state.current = state.initialWeather;
        },
    },
    extraReducers: builder => {
        builder.addCase(
            fetchCurrentWeather.pending,
            (state: ICurrentWeather) => {
                state.currentWeatherStatus = StatusEnum.LOADING;
            }
        );
        builder.addCase(
            fetchCurrentWeather.fulfilled,
            (
                state: ICurrentWeather,
                action: PayloadAction<ICurrentWeather>
            ) => {
                state.current = action.payload.current;
                if (!Object.keys(state.initialWeather).length) {
                    state.initialWeather = action.payload.current;
                }
                state.currentWeatherStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(
            fetchCurrentWeather.rejected,
            (state: ICurrentWeather) => {
                state.currentWeatherStatus = StatusEnum.ERROR;
            }
        );
    },
});

export const { setInitialWeather } = currentSlice.actions;

export default currentSlice.reducer;
