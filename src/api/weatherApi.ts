import axios from 'axios'; // Import axios for making HTTP requests

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'; // Base URL for the weather API

// Define the structure of the temperature response from the API
interface TemperatureResponse {
    hourly: {
        temperature_2m: number[];
        time: string[];
    };
}

// Function to fetch temperature data for a given latitude and longitude
export const fetchTemperature = async (latitude: number, longitude: number): Promise<{ temperature: number[], time: string[] }> => {
    // Make a GET request to the weather API with the specified parameters
    const response = await axios.get<TemperatureResponse>(`${BASE_URL}`, {
        params: {
            latitude: latitude,
            longitude: longitude,
            hourly: 'temperature_2m'
        }
    });
    // Return the temperature and time data from the API response
    return {
        temperature: response.data.hourly.temperature_2m,
        time: response.data.hourly.time
    };
};
