import axios from 'axios';
import { IForecast } from '../store/forecastWeather/types';
import { IUser } from '../store/user/types';
import { ICurrentWeather } from '../store/currentWeather/types';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const currentAPI = async (user: IUser) => {
    return await axios.get<ICurrentWeather>(
        `${API_BASE}/current?city=${user.city}`
    );
};

export const forecastAPI = async (user: IUser) => {
    return await axios.get<IForecast>(
        `${API_BASE}/forecast?city=${user.city}&days=${user.forecastDays}`
    );
};
