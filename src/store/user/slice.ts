import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './types';
import { fetchCitiesList, fetchUserIP, fetchUserLocation } from './actions';
import { StatusEnum } from '../types';

const initialState: IUser = {
    ip: '',
    country_code: '',
    city: '',
    userInitialCity: '',
    forecastDays: '2',
    userStatus: StatusEnum.DEFAULT,
    citiesList: [],
    citiesListStatus: StatusEnum.DEFAULT,
};

export const userLocationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setForecastDays(state, action) {
            state.forecastDays = action.payload;
        },
        setUserCity(state, action: PayloadAction<string>) {
            state.city =
                action.payload.charAt(0).toUpperCase() +
                action.payload.slice(1);
            state.userStatus = StatusEnum.SUCCESS;

            if (!action.payload) {
                state.userStatus = StatusEnum.ERROR;
            }
        },
        setInitialCity(state: IUser) {
            state.city = state.userInitialCity;
        },
        resetCitiesList(state) {
            state.citiesList = [];
        },
    },
    extraReducers: builder => {
        // getUserIP
        builder.addCase(fetchUserIP.pending, state => {
            state.ip = '';
            state.userStatus = StatusEnum.LOADING;
        });
        builder.addCase(
            fetchUserIP.fulfilled,
            (state, action: PayloadAction<IUser>) => {
                state.ip = action.payload.ip;
                state.userStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(fetchUserIP.rejected, state => {
            state.ip = '';
            state.userStatus = StatusEnum.ERROR;
        });
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
                state.userInitialCity = action.payload.city;
                state.userStatus = StatusEnum.SUCCESS;
            }
        );
        builder.addCase(fetchUserLocation.rejected, state => {
            state.country_code = '';
            state.city = '';
            state.userStatus = StatusEnum.ERROR;
        });
        // get Cities List
        builder.addCase(fetchCitiesList.pending, state => {
            state.citiesListStatus = StatusEnum.LOADING;
        });
        builder.addCase(fetchCitiesList.fulfilled, (state, action) => {
            state.citiesList = action.payload;
            state.citiesListStatus = StatusEnum.SUCCESS;
        });
        builder.addCase(fetchCitiesList.rejected, state => {
            state.citiesListStatus = StatusEnum.ERROR;
        });
    },
});

export const { setForecastDays, setUserCity, setInitialCity, resetCitiesList } =
    userLocationSlice.actions;

export default userLocationSlice.reducer;
