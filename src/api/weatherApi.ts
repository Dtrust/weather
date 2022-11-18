import axios from 'axios';
import { IWeather } from '../store/weather/types';
import { IUser } from '../store/user/types';

export const weatherAPI = async (user: IUser) => {
    return await axios.get<IWeather>(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER}&q=${user.city}&days=${user.forecastDays}&aqi=no`
    );
};
