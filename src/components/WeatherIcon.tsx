import { weatherMeta } from '../lib/weatherMeta';
import type { WeatherCode } from '../types';

type WeatherIconProps = {
  code: WeatherCode;
  size?: 'small' | 'medium' | 'large' | 'hero';
  colored?: boolean;
};

// Lucide "cloud-sun"（v1.54.0）と同一の線データ。太陽パーツと雲パーツを分け、
// 形を変えずにパーツごとに色を付けられるようにしたもの。
const SUN_PATHS = [
  'M12 2v2',
  'm4.93 4.93 1.41 1.41',
  'M20 12h2',
  'm19.07 4.93-1.41 1.41',
  'M15.947 12.65a4 4 0 0 0-5.925-4.128',
];
const CLOUD_PATH = 'M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z';

function PartlyCloudyTwoTone() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g className="wi-sun">
        {SUN_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path className="wi-cloud" d={CLOUD_PATH} />
    </svg>
  );
}

export function WeatherIcon({ code, size = 'medium', colored = true }: WeatherIconProps) {
  const { Icon, label } = weatherMeta[code];
  const colorClass = colored ? ` weather-icon--${code}` : '';
  const content =
    colored && code === 'partly-cloudy' ? <PartlyCloudyTwoTone /> : <Icon strokeWidth={1.7} />;

  return (
    <span className={`weather-icon weather-icon-${size}${colorClass}`} aria-label={label} title={label}>
      {content}
    </span>
  );
}
