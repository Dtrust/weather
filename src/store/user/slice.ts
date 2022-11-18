import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './types';
import { fetchUserLocation } from '../user/actions';
import { StatusEnum } from '../weather/types';

const initialState: IUser = {
    ip: '',
    country_code: '',
    city: '',
    forecastDays: '3',
    userStatus: StatusEnum.LOADING,
};

export const userLocationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setForecastDays(state, action) {
            state.forecastDays = action.payload;
        },
        setUserCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
            state.userStatus = StatusEnum.SUCCESS;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchUserLocation.pending, state => {
            state.country_code = '';
            state.city = '';
            state.userStatus = StatusEnum.LOADING;
        });
        builder.addCase(
            fetchUserLocation.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.country_code = action.payload.country_code;
                state.city = action.payload.city;
                state.userStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(fetchUserLocation.rejected, state => {
            state.country_code = '';
            state.city = '';
            state.userStatus = StatusEnum.ERROR;
        });
    },
});

export const { setForecastDays, setUserCity } = userLocationSlice.actions;

export default userLocationSlice.reducer;
