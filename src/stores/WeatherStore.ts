import { makeAutoObservable } from 'mobx';
import { fetchTemperature } from '../api/weatherApi';

class WeatherStore {
    temperature: number[] | null = null;
    loading: boolean = false;
    error: Error | null = null;
    latitude: number | null = null;
    longitude: number | null = null;
    days: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    async getTemperature() {
        this.loading = true;
        try {
            console.log(this.latitude, this.longitude);
            if (this.latitude !== null && this.longitude !== null) {
                this.temperature = await fetchTemperature(this.latitude, this.longitude);
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
        console.log(latitude, longitude);
        this.latitude = latitude;
        this.longitude = longitude;
    }

    setDays(days: number) {
        console.log(days);
        this.days = days;
    }
}

export const weatherStore = new WeatherStore();
