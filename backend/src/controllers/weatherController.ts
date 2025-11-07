// src/controllers/weatherController.ts
import { Request, Response } from 'express';
import {
  fetchCities,
  fetchWeather,
  fetchWeatherById
} from '../services/indianapi'; // <-- Import our new service

// Helper function to handle API errors
const handleApiError = (err: any, res: Response, resource: string) => {
  // Check if it's the 404 error from the API
  if (err.response?.status === 404) {
    return res.status(404).json({
      message: 'Weather fetch failed',
      error: `${resource} not found`
    });
  }
  
  // Check for the missing API key error from our interceptor
  if (err.message === 'Weather API key not configured on server') {
    return res.status(500).json({ message: err.message });
  }

  // Handle other errors
  return res.status(500).json({
    message: 'Weather fetch failed',
    error: err.response?.data?.message || err.message
  });
};

// --- Your new, clean controller functions ---

export const getCities = async (_req: Request, res: Response) => {
  try {
    const response = await fetchCities();
    return res.json(response.data);
  } catch (err: any) {
    return handleApiError(err, res, 'Cities');
  }
};

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const response = await fetchWeather(city as string);
    return res.json(response.data);
  } catch (err: any) {
    return handleApiError(err, res, 'City');
  }
};

export const getWeatherById = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'City ID parameter is required' });
    }

    const response = await fetchWeatherById(id as string);
    return res.json(response.data);
  } catch (err: any) {
    return handleApiError(err, res, 'City ID');
  }
};