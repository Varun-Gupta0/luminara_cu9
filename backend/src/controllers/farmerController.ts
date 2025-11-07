import { Request, Response } from 'express';
import axios from 'axios';
import Farmer from '../models/farmer.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Add these interfaces at the top
interface WeatherAPIResponse {
  temp: number;
  feels_like: number;
  humidity: number;
  min_temp: number;
  max_temp: number;
  wind_speed: number;
  wind_degrees: number;
  sunrise: number;
  sunset: number;
}

interface WeatherQueryParams {
  city?: string;
  lat?: string;
  lon?: string;
}

const API_KEY = process.env.API_NINJAS_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { city, lat, lon } = req.query as WeatherQueryParams;
    
    if (!API_KEY) {
      return res.status(500).json({ message: 'Server missing API_NINJAS_KEY' });
    }

    if (!city && (!lat || !lon)) {
      return res.status(400).json({ message: 'Provide city or lat,lon' });
    }

    const response = await axios.get<WeatherAPIResponse>('https://api.api-ninjas.com/v1/weather', {
      params: city ? { city } : { lat, lon },
      headers: { 'X-Api-Key': API_KEY }
    });

    const data: WeatherAPIResponse = response.data;
    return res.json({
      location: city || `${lat},${lon}`,
      temp: data.temp,
      feels_like: data.feels_like,
      humidity: data.humidity,
      min_temp: data.min_temp,
      max_temp: data.max_temp,
      wind_speed: data.wind_speed,
      wind_degrees: data.wind_degrees,
      sunrise: new Date(data.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sunset * 1000).toLocaleTimeString()
    });

  } catch (err: any) {
    console.error('Weather API error:', err.response?.data || err.message);
    return res.status(500).json({ 
      message: 'Weather fetch failed', 
      error: err.response?.data || err.message 
    });
  }
};

export const registerFarmer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, farmName, location } = req.body as RegisterData;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await Farmer.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const farmer = new Farmer({ 
      name, 
      email, 
      password: hashed, 
      phone, 
      farmName, 
      location 
    });
    await farmer.save();

    return res.status(201).json({ 
      id: farmer._id, 
      name: farmer.name, 
      email: farmer.email 
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginFarmer = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginData;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: farmer._id }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ 
      id: farmer._id, 
      name: farmer.name, 
      email: farmer.email, 
      token 
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  farmName?: string;
  location?: string;
}

interface LoginData {
  email: string;
  password: string;
}