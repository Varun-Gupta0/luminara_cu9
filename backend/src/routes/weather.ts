import { Router } from 'express';
import { getWeather } from '../controllers/weatherController';
import { getCities } from '../controllers/weatherController';
import { getWeatherById } from '../controllers/weatherController';

const router = Router();

// Basic weather route
router.get('/', getWeather);

// Indian Weather API specific routes
router.get('/india/cities', getCities);
router.get('/india/weather', getWeather);
router.get('/india/weather_by_id', getWeatherById);

export default router;