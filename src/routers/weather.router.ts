import express from 'express';
import { getWeatherHandler } from '../controllers/weather.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.config';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WeatherData:
 *       type: object
 *       properties:
 *         coord:
 *           type: object
 *           properties:
 *             lon:
 *               type: number
 *             lat:
 *               type: number
 *         weather:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               main:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *         main:
 *           type: object
 *           properties:
 *             temp:
 *               type: number
 *             feels_like:
 *               type: number
 *             temp_min:
 *               type: number
 *             temp_max:
 *               type: number
 *             pressure:
 *               type: number
 *             humidity:
 *               type: number
 *             sea_level:
 *               type: number
 *             grnd_level:
 *               type: number
 *         wind:
 *           type: object
 *           properties:
 *             speed:
 *               type: number
 *             deg:
 *               type: number
 *             gust:
 *               type: number
 *         clouds:
 *           type: object
 *           properties:
 *             all:
 *               type: number
 *         dt:
 *           type: number
 *         sys:
 *           type: object
 *           properties:
 *             country:
 *               type: string
 *             sunrise:
 *               type: number
 *             sunset:
 *               type: number
 *         timezone:
 *           type: number
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         cod:
 *           type: number
 *
 * tags:
 *   - name: Weather
 *     description: Operations related to weather information
 * /weather:
 *   get:
 *     tags:
 *       - Weather
 *     summary: Weather information operations
 *     description: Returns weather information for a specified location. You can fill out 'lat' and 'lon' or only 'city' parameter
 *     parameters:
 *       - in: query
 *         name: city
 *         required: false
 *         schema:
 *           type: string
 *         description: The name of the city.
 *       - in: query
 *         name: lat
 *         required: false
 *         schema:
 *           type: number
 *           format: double
 *         description: The latitude part of the location.
 *       - in: query
 *         name: lon
 *         required: false
 *         schema:
 *           type: number
 *           format: double
 *         description: The longitude part of the location.
 *     responses:
 *       200:
 *         description: Successful response with the weather information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherData'
 *       400:
 *         description: Bad request if the query parameters are invalid.
 *       404:
 *         description: Not found if the weather information for the location is not available.
 */

router.get('/weather', getWeatherHandler);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
