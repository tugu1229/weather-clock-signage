import { weatherMeta } from '../lib/weatherMeta';
import type { WeatherCode } from '../types';

type WeatherIconProps = {
  code: WeatherCode;
  size?: 'small' | 'medium' | 'large' | 'hero';
};

export function WeatherIcon({ code, size = 'medium' }: WeatherIconProps) {
  const { Icon, label } = weatherMeta[code];
  return (
    <span className={`weather-icon weather-icon-${size}`} aria-label={label} title={label}>
      <Icon strokeWidth={1.7} />
    </span>
  );
}
