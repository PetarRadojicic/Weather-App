import { makeAutoObservable } from 'mobx';
import { fetchTemperature } from '../api/weatherApi';

class WeatherStore {
    temperature: number[] | null = null;
    time: string[] = [];
    loading: boolean = false;
    error: Error | null = null;
    latitude: number | null = null;
    longitude: number | null = null;
    days: number = 1; // Add days property

    constructor() {
        makeAutoObservable(this);
    }

    async getTemperature() {
        this.loading = true;
        try {
            if (this.latitude !== null && this.longitude !== null) {
                const response = await fetchTemperature(this.latitude, this.longitude);
                this.temperature = response.temperature;
                this.time = response.time;
            } else {
                throw new Error("Coordinates not set");
            }
        } catch (error) {
            this.error = error as Error;
        } finally {
            this.loading = false;
        }
    }

    setCoordinates(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    setDays(days: number) { // Add setDays method
        this.days = days;
    }
}

export const weatherStore = new WeatherStore();
