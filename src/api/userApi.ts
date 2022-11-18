import axios from 'axios';
import { IUser } from '../store/user/types';

export const getUserIP = async () => {
    return await axios
        .get<IUser>(`https://ipinfo.io?token=${process.env.REACT_APP_IPINFO}`)
        .then(res => res.data);
};

export const getUserLocation = async (ip: string) => {
    return await axios
        .get<IUser>(
            `https://api.weatherapi.com/v1/ip.json?key=${process.env.REACT_APP_WEATHER}&q=${ip}`
        )
        .then(res => res.data);
};
