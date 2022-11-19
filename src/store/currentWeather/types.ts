import { StatusEnum } from '../types';

export interface ICurrentWeather {
    current: {
        condition: {
            icon: string;
            text: string;
        };
        temp_c: number;
        feelslike_c: number;
        wind_dir: string;
        wind_kph: number;
        pressure_mb: number;
        humidity: number;
    };
    currentWeatherStatus: StatusEnum;
}
