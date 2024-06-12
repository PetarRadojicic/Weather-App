import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

interface TemperatureResponse {
    hourly: {
        temperature_2m: number[];
    };
}

export const fetchTemperature = async (latitude: number, longitude: number): Promise<number[]> => {
    const response = await axios.get<TemperatureResponse>(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
    return response.data.hourly.temperature_2m;
};
