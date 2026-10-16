import { signageConfig } from '../config';
import type { CSSProperties } from 'react';
import type { ForecastView, WeatherSnapshot } from '../types';
import { HourlyForecastView } from './HourlyForecastView';
import { TomorrowForecastView } from './TomorrowForecastView';
import { WeeklyForecastView } from './WeeklyForecastView';

type ForecastRotatorProps = {
  activeView: ForecastView;
  weather: WeatherSnapshot;
};

export function ForecastRotator({ activeView, weather }: ForecastRotatorProps) {
  const tomorrow = weather.daily[1] ?? weather.daily[0];

  return (
    <section
      className="rotator"
      style={{ '--fade-duration': `${signageConfig.fadeDurationMs}ms` } as CSSProperties}
      aria-label="予報表示"
    >
      <div className={`forecast-layer ${activeView === 'hourly' ? 'is-active' : ''}`}>
        <HourlyForecastView items={weather.hourly} />
      </div>
      <div className={`forecast-layer ${activeView === 'weekly' ? 'is-active' : ''}`}>
        <WeeklyForecastView items={weather.daily.slice(0, 4)} />
      </div>
      <div className={`forecast-layer ${activeView === 'tomorrow' ? 'is-active' : ''}`}>
        <TomorrowForecastView item={tomorrow} />
      </div>
    </section>
  );
}
