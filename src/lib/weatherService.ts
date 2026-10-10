import { signageConfig } from '../config';
import { mockWeatherData } from '../data/mockWeather';
import type { DailyForecast, HourlyForecast, WeatherCode, WeatherSnapshot } from '../types';

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    weather_code?: number;
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    precipitation_probability?: number[];
    weather_code?: number[];
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
  };
};

const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

export async function getWeatherSnapshot(): Promise<WeatherSnapshot> {
  try {
    const response = await fetch(buildOpenMeteoUrl(), { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Open-Meteo request failed: ${response.status}`);
    }

    return transformOpenMeteoResponse((await response.json()) as OpenMeteoResponse);
  } catch (error) {
    return {
      ...mockWeatherData,
      lastUpdated: new Date().toISOString(),
      errorMessage: error instanceof Error ? error.message : 'Open-Meteo request failed',
    };
  }
}

function buildOpenMeteoUrl(): string {
  const params = new URLSearchParams({
    latitude: String(signageConfig.coordinates.latitude),
    longitude: String(signageConfig.coordinates.longitude),
    current: 'temperature_2m,weather_code',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    forecast_days: '7',
    timezone: 'Asia/Tokyo',
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

function transformOpenMeteoResponse(data: OpenMeteoResponse): WeatherSnapshot {
  const daily = toDailyForecast(data.daily);
  const hourly = toHourlyForecast(data.hourly);
  const today = daily[0] ?? mockWeatherData.daily[0];

  return {
    region: {
      name: signageConfig.regionName,
      prefecture: signageConfig.regionPrefecture,
    },
    current: {
      condition: toWeatherCode(data.current?.weather_code),
      temperature: roundTemperature(data.current?.temperature_2m),
      high: today.high,
      low: today.low,
      precipitationProbability: today.precipitationProbability,
    },
    hourly,
    daily,
    lastUpdated: data.current?.time ?? new Date().toISOString(),
    isMock: false,
    source: 'open-meteo',
  };
}

function toHourlyForecast(hourly: OpenMeteoResponse['hourly']): HourlyForecast[] {
  if (!hourly?.time?.length) {
    return mockWeatherData.hourly;
  }

  const now = Date.now();
  const upcoming = hourly.time
    .map((time, index) => ({ time, index }))
    .filter(({ time }) => new Date(time).getTime() >= now)
    .filter((_, index) => index % 3 === 0)
    .slice(0, 6);

  const selected = upcoming.length >= 6 ? upcoming : hourly.time.slice(0, 6).map((time, index) => ({ time, index }));

  return selected.map(({ time, index }) => ({
    time: formatHour(time),
    condition: toWeatherCode(hourly.weather_code?.[index]),
    temperature: roundTemperature(hourly.temperature_2m?.[index]),
    precipitationProbability: roundProbability(hourly.precipitation_probability?.[index]),
  }));
}

function toDailyForecast(daily: OpenMeteoResponse['daily']): DailyForecast[] {
  if (!daily?.time?.length) {
    return mockWeatherData.daily;
  }

  return daily.time.slice(0, 7).map((date, index) => ({
    date: formatMonthDay(date),
    weekday: weekdays[new Date(`${date}T00:00:00+09:00`).getDay()],
    condition: toWeatherCode(daily.weather_code?.[index]),
    high: roundTemperature(daily.temperature_2m_max?.[index]),
    low: roundTemperature(daily.temperature_2m_min?.[index]),
    precipitationProbability: roundProbability(daily.precipitation_probability_max?.[index]),
  }));
}

function toWeatherCode(code?: number): WeatherCode {
  if (code === undefined) {
    return 'cloudy';
  }

  if (code === 0) {
    return 'sunny';
  }

  if ([1, 2].includes(code)) {
    return 'partly-cloudy';
  }

  if ([3, 45, 48].includes(code)) {
    return 'cloudy';
  }

  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99)) {
    return 'rain';
  }

  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return 'snow';
  }

  return 'cloudy';
}

function roundTemperature(value?: number): number {
  return Math.round(value ?? 0);
}

function roundProbability(value?: number): number {
  return Math.round(value ?? 0);
}

function formatHour(value: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));
}

function formatMonthDay(value: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(`${value}T00:00:00+09:00`));
}
