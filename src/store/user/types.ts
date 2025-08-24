import { StatusEnum } from '../types';

export type CityItemType = {
    name: string;
    display_name: string;
    place_id: string;
};

export interface IUser {
    ip: string;
    country_code?: string;
    city?: string;
    userInitialCity?: string;
    forecastDays?: string;
    userStatus?: StatusEnum;
    citiesList: CityItemType[];
    citiesListStatus: StatusEnum;
}
