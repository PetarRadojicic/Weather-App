import { makeAutoObservable } from 'mobx'; // Import makeAutoObservable from MobX
import { fetchTemperature } from '../api/weatherApi'; // Import fetchTemperature function

// Weather store to manage weather data state
class WeatherStore {
    temperature: number[] | null = null; // Temperature data
    time: string[] = []; // Time data
    loading: boolean = false; // Loading state
    error: Error | null = null; // Error state
    latitude: number | null = null; // Latitude coordinate
    longitude: number | null = null; // Longitude coordinate
    days: number = 1; // Number of days to fetch data for

    constructor() {
        makeAutoObservable(this); // Make the store observable
    }

    // Async function to fetch temperature data
    async getTemperature() {
        this.loading = true; // Set loading state to true
        try {
            if (this.latitude !== null && this.longitude !== null) {
                const response = await fetchTemperature(this.latitude, this.longitude); // Fetch temperature data
                this.temperature = response.temperature; // Set temperature data
                this.time = response.time; // Set time data
            } else {
                throw new Error("Coordinates not set"); // Throw error if coordinates are not set
            }
        } catch (error) {
            this.error = error as Error; // Set error state
        } finally {
            this.loading = false; // Set loading state to false
        }
    }

    // Function to set coordinates
    setCoordinates(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Function to set the number of days
    setDays(days: number) {
        this.days = days;
    }
}

// Export an instance of the weather store
export const weatherStore = new WeatherStore();
