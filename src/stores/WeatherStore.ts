import { makeAutoObservable } from 'mobx';
import { fetchTemperature } from '../api/weatherApi';

class WeatherStore {
    temperature: number[] | null = null;
    loading: boolean = false;
    error: Error | null = null;
    latitude: number | null = null;
    longitude: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getTemperature(latitude: number, longitude: number) {
        this.loading = true;
        try {
            this.temperature = await fetchTemperature(latitude, longitude);
        } catch (error) {
            this.error = error as Error;
        } finally {
            this.loading = false;
        }
    }

    setCoordinates(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        console.log('Coordinates set:', latitude, longitude);
    }
}

export const weatherStore = new WeatherStore();
