import axios from 'axios';
import { IUser } from '../store/user/types';

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export const getUserIP = async (): Promise<string> => {
    const res = await axios.get<{ ip: string }>(
        'https://api.ipify.org?format=json'
    );
    return res.data.ip as string;
};

export const getUserLocation = async (ip: string) => {
    return await axios
        .get<IUser>(`${API_BASE}/location?ip=${ip}`)
        .then(res => res.data);
};

export const getCitiesList = async (query: string) => {
    const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${query.toLowerCase()}&format=json&limit=5`
    );
    return res.data;
};
