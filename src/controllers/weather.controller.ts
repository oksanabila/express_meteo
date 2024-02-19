import { Request, Response } from 'express';
import {getWeatherByCity, getWeatherByCoordinates} from '../services/weather.service';
import { ApiError } from '../errors/api.error';
import {isValidCoordinates} from "../utils";

export async function getWeatherHandler(req: Request, res: Response): Promise<void> {
    const { lat, lon, city } = req.query;

    try {
        if ((lat !== undefined && lon !== undefined) || city !== undefined) {
            if (lat !== undefined && lon !== undefined) {
                const latNumber = parseFloat(lat as string);
                const lonNumber = parseFloat(lon as string);
                if (isNaN(latNumber) || isNaN(lonNumber)) {
                    throw new ApiError('Latitude or longitude must be a number', 400);
                }
                if (!isValidCoordinates(lonNumber, latNumber)) {
                    throw new ApiError('Invalid coordinates provided', 400);
                }
                const weatherData = await getWeatherByCoordinates(lonNumber, latNumber);
                res.json(weatherData);
            } else if (city !== undefined) {
                const weatherData = await getWeatherByCity(city as string);
                res.json(weatherData);
            } else {
                throw new ApiError('Latitude/longitude or City name are required', 400);
            }
        } else {
            throw new ApiError('Latitude/longitude or City name are required', 400);
        }
    } catch (error: any) {
        if (error instanceof ApiError) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
}
