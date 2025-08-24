import { StatusEnum } from '../types';

export type WeatherConditionType = {
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

export interface ICurrentWeather {
    current: WeatherConditionType;
    initialWeather: WeatherConditionType;
    currentWeatherStatus: StatusEnum;
}
