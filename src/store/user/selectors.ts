import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user;

export const selectUserForecast = (state: RootState) => state.user.forecastDays;

export const selectUserCity = (state: RootState) => state.user.city;

export const selectUserStatus = (state: RootState) => state.user.userStatus;
