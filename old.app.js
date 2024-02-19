const express = require('express');
const app = express();
const axios = require('axios').default;
const PORT = 5100;
const BASE_URL = `https://api.openweathermap.org`;
const APIKEY = '3f52213b83e384f26c6f4d7672cb7288';


class ParametersError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 400;
    }
}

async function getWeather(lon, lat) {
    try {
        const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error.response.data);
        throw new Error("Failed to fetch weather data");
    }
}

async function getWeatherByCity(city) {
    let lon = '';
    let lat = '';
    try {
        const url = `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`;
        const response = await axios.get(url);
        response.data.forEach((element) => {
            lon = element.lon;
            lat = element.lat;
        })
        if (lon === '' || lat === '') {
            throw new ParametersError('City not found');
        }
        return await getWeather(lon, lat);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

app.use(express.json());

app.get('/weather', async (req, res) => {
    const { lat, lon, city } = req.query;
    try {
        if ((lat && lon) || city) {
            let weatherData;
            if (lat && lon) {
                if(lat > 90 || lat < -90 || lon > 180 || lon < -180) {
                    throw new ParametersError('Latitude or longitude are out of range');
                }
                weatherData = await getWeather(lon, lat);

            } else {
                weatherData = await getWeatherByCity(city);
            }
            res.json(weatherData);
        } else {
            throw new ParametersError('Latitude/longitude or City name are required');
        }
    } catch (error) {
        if (error instanceof ParametersError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.toString() });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
