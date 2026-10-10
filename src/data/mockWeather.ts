import type { WeatherSnapshot } from '../types';

export const mockWeatherData: WeatherSnapshot = {
  region: {
    name: '横浜',
    prefecture: '神奈川県',
  },
  current: {
    condition: 'partly-cloudy',
    temperature: 22,
    high: 25,
    low: 18,
    precipitationProbability: 20,
  },
  hourly: [
    { time: '9:00', condition: 'sunny', temperature: 21, precipitationProbability: 10 },
    { time: '12:00', condition: 'partly-cloudy', temperature: 24, precipitationProbability: 20 },
    { time: '15:00', condition: 'cloudy', temperature: 25, precipitationProbability: 30 },
    { time: '18:00', condition: 'rain', temperature: 22, precipitationProbability: 60 },
    { time: '21:00', condition: 'cloudy', temperature: 20, precipitationProbability: 40 },
    { time: '0:00', condition: 'cloudy', temperature: 19, precipitationProbability: 30 },
  ],
  daily: [
    { date: '10/10', weekday: '土', condition: 'partly-cloudy', high: 25, low: 18, precipitationProbability: 20 },
    { date: '10/11', weekday: '日', condition: 'rain', high: 23, low: 17, precipitationProbability: 70 },
    { date: '10/12', weekday: '月', condition: 'cloudy', high: 22, low: 16, precipitationProbability: 40 },
    { date: '10/13', weekday: '火', condition: 'sunny', high: 24, low: 17, precipitationProbability: 10 },
    { date: '10/14', weekday: '水', condition: 'sunny', high: 25, low: 18, precipitationProbability: 10 },
    { date: '10/15', weekday: '木', condition: 'partly-cloudy', high: 24, low: 19, precipitationProbability: 30 },
    { date: '10/16', weekday: '金', condition: 'snow', high: 19, low: 12, precipitationProbability: 50 },
  ],
  lastUpdated: '2026-10-10T08:30:00+09:00',
  isMock: true,
  source: 'mock',
};
