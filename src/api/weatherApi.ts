import axios from 'axios';
import { IForecast } from '../store/forecastWeather/types';
import { IUser } from '../store/user/types';
import { ICurrentWeather } from '../store/currentWeather/types';

export const currentAPI = async (user: IUser) => {
    return await axios.get<ICurrentWeather>(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER}&q=${user.city}&aqi=no`
    );
};

export const forecastAPI = async (user: IUser) => {
    return await axios.get<IForecast>(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER}&q=${user.city}&days=${user.forecastDays}&aqi=no`
    );
};
