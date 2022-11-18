import { StatusEnum } from '../weather/types';

export interface IUser {
    ip?: string;
    country_code?: string;
    city?: string;
    forecastDays?: string;
    userStatus?: StatusEnum;
}
