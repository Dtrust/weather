export enum StatusEnum {
    LOADING = 'Loading',
    SUCCESS = 'Success',
    ERROR = 'Error',
}

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

export interface IWeather {
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
    forecast: ForecastItemType[];
    weatherStatus: StatusEnum;
}
