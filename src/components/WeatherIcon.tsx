import { weatherMeta } from '../lib/weatherMeta';
import type { WeatherCode } from '../types';

type WeatherIconProps = {
  code: WeatherCode;
  size?: 'small' | 'medium' | 'large' | 'hero';
  colored?: boolean;
};

export function WeatherIcon({ code, size = 'medium', colored = false }: WeatherIconProps) {
  const { Icon, label } = weatherMeta[code];
  const colorClass = colored ? ` weather-icon--${code}` : '';
  return (
    <span className={`weather-icon weather-icon-${size}${colorClass}`} aria-label={label} title={label}>
      <Icon strokeWidth={1.7} />
    </span>
  );
}
