export type WeatherCode = 'sunny' | 'cloudy' | 'rain' | 'snow' | 'partly-cloudy';

export type ForecastView = 'hourly' | 'weekly' | 'tomorrow';

export type RegionInfo = {
  name: string;
  prefecture: string;
};

export type CurrentWeather = {
  condition: WeatherCode;
  temperature: number;
  high: number;
  low: number;
  precipitationProbability: number;
};

export type HourlyForecast = {
  time: string;
  condition: WeatherCode;
  temperature: number;
  precipitationProbability: number;
};

export type DailyForecast = {
  date: string;
  weekday: string;
  condition: WeatherCode;
  high: number;
  low: number;
  precipitationProbability: number;
};

export type WeatherSnapshot = {
  region: RegionInfo;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  lastUpdated: string;
  isMock: boolean;
  source: 'open-meteo' | 'mock';
  errorMessage?: string;
};
