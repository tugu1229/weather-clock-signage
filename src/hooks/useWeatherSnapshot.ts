import { useEffect, useState } from 'react';
import { signageConfig } from '../config';
import { mockWeatherData } from '../data/mockWeather';
import { getWeatherSnapshot } from '../lib/weatherService';
import type { WeatherSnapshot } from '../types';

export function useWeatherSnapshot(): WeatherSnapshot {
  const [weather, setWeather] = useState<WeatherSnapshot>(mockWeatherData);

  useEffect(() => {
    let isMounted = true;

    const refreshWeather = async () => {
      const nextWeather = await getWeatherSnapshot();

      if (isMounted) {
        setWeather(nextWeather);
      }
    };

    refreshWeather();
    const intervalId = window.setInterval(refreshWeather, signageConfig.weatherRefreshIntervalMs);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshWeather();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return weather;
}
