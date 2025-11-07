// src/services/indianApi.ts
import axios from 'axios';

// Minimal response shape used by controllers — keep lightweight to avoid coupling to axios types
export interface WeatherResponse {
  status?: number;
  data?: {
    city?: string;
    temperature?: number;
    humidity?: number;
    description?: string;
  };
  message?: string;
}

const apiClient = axios.create({
  baseURL: 'https://weather.indianapi.in'
});

// Add API key header on each request. Use `any` for config to avoid strict axios type mismatch.
apiClient.interceptors.request.use(
  (config: any): any => {
    const apiKey = process.env.WEATHER_API_KEY || process.env.API_NINJAS_KEY;
    if (!apiKey) {
      // return rejected promise to match axios overloads
      return Promise.reject(new Error('Weather API key not configured on server'));
    }

    config.headers = {
      ...(config.headers || {}),
      'x-api-key': apiKey
    };

    return config;
  },
  (error: any) => Promise.reject(error)
);

// Export simple functions returning Promise<any> to avoid typing conflicts
export const fetchCities = (): Promise<any> =>
  Promise.resolve(apiClient.get<WeatherResponse>('/india/cities'));

export const fetchWeather = (city: string): Promise<any> =>
  Promise.resolve(apiClient.get<WeatherResponse>('/india/weather', { params: { city } }));

export const fetchWeatherById = (id: string): Promise<any> =>
  Promise.resolve(apiClient.get<WeatherResponse>('/india/weather_by_id', { params: { id } }));