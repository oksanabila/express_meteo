import axios from 'axios';
import { ApiError } from '../errors/api.error';
import { APIKEY } from '../configs/config';
import { BASE_URL } from '../constants/constants';
import {IWeatherData, WeatherDataModel} from "../models/weather.model";
import {isValidCoordinates} from "../utils";

export async function getWeatherByCoordinates(lon: number, lat: number): Promise<IWeatherData> {
    try {
        if (!isValidCoordinates(lon, lat)) {
            throw new ApiError('Invalid coordinates provided', 400);
        }

        const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
        const response = await axios.get(url);

        const result = new WeatherDataModel(response.data);
        console.log(result);
        return result;

    } catch (error: any) {
        console.error('Error fetching weather data:', error);
        throw new ApiError('Failed to fetch weather data вапвапва', 500);
    }
}

export async function getWeatherByCity(city: string): Promise<IWeatherData | null> {
    try {
        if (!city) {
            throw new ApiError('City parameter is required', 400);
        }

        const url = `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`;
        const response = await axios.get(url);

        if(!response.data[0]) {
            throw new ApiError('City not found', 400);
        }

        const {lon, lat} = response.data[0];

        return await getWeatherByCoordinates(lon, lat);

    } catch (error: any) {
        console.error('Error fetching weather data:', error);

        if (error instanceof ApiError) {
           throw error;
        } else {
            throw new ApiError('Failed to fetch weather data by city', 500);
        }
    }
}
