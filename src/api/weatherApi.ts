import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

interface TemperatureResponse {
    hourly: {
        temperature_2m: number[];
        time: string[];
    };
}

export const fetchTemperature = async (latitude: number, longitude: number): Promise<{ temperature: number[], time: string[] }> => {
    const response = await axios.get<TemperatureResponse>(`${BASE_URL}`, {
        params: {
            latitude: latitude,
            longitude: longitude,
            hourly: 'temperature_2m'
        }
    });
    return {
        temperature: response.data.hourly.temperature_2m,
        time: response.data.hourly.time
    };
};
