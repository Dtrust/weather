import { RootState } from '../store';

export const selectForecast = (state: RootState) => state.forecastWeather;
