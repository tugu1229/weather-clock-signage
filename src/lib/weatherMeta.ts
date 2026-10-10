import { Cloud, CloudRain, CloudSun, Snowflake, Sun } from 'lucide-react';
import type { ComponentType } from 'react';
import type { WeatherCode } from '../types';

type WeatherMeta = {
  label: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

export const weatherMeta: Record<WeatherCode, WeatherMeta> = {
  sunny: { label: '晴れ', Icon: Sun },
  cloudy: { label: '曇り', Icon: Cloud },
  rain: { label: '雨', Icon: CloudRain },
  snow: { label: '雪', Icon: Snowflake },
  'partly-cloudy': { label: '晴れ時々曇り', Icon: CloudSun },
};
