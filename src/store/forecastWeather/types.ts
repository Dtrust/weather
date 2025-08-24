import { StatusEnum } from '../types';

export type ForecastItemType = {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
};

export interface IForecast {
    forecastItems: ForecastItemType[];
    initialForecastItems: ForecastItemType[];
    forecastStatus?: StatusEnum;
    forecast?: {
        forecastday: ForecastItemType[];
    };
}
