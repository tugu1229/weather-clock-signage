import { useEffect, useState } from 'react';
import { formatDate, formatTime, formatWeekday } from '../lib/dateFormat';
import { weatherMeta } from '../lib/weatherMeta';
import type { WeatherSnapshot } from '../types';
import { WeatherIcon } from './WeatherIcon';

type CurrentPanelProps = {
  now: Date;
  weather: WeatherSnapshot;
};

export function CurrentPanel({ now, weather }: CurrentPanelProps) {
  const currentMeta = weatherMeta[weather.current.condition];
  const timeLabel = formatTime(now);
  const [isClockChanging, setIsClockChanging] = useState(false);

  useEffect(() => {
    setIsClockChanging(true);
    const timeoutId = window.setTimeout(() => {
      setIsClockChanging(false);
    }, 720);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timeLabel]);

  return (
    <section className="current-panel" aria-label="現在の天気と時刻">
      <div className="location-row">
        <span className="location-main">{weather.region.name}</span>
        <span className="location-sub">{weather.region.prefecture}</span>
      </div>

      <div className="clock-frame" aria-label="現在時刻">
        <div className={`clock ${isClockChanging ? 'is-changing' : ''}`}>
          {timeLabel}
        </div>
      </div>
      <div className="date-row">
        <span>{formatDate(now)}</span>
        <span>{formatWeekday(now)}</span>
      </div>

      <div className="current-weather">
        <WeatherIcon code={weather.current.condition} size="large" />
        <div>
          <div className="condition-label">{currentMeta.label}</div>
          <div className="temperature-now">{weather.current.temperature}<span>℃</span></div>
        </div>
      </div>

      <div className="metric-strip">
        <div>
          <span className="metric-label">最高</span>
          <strong>{weather.current.high}℃</strong>
        </div>
        <div>
          <span className="metric-label">最低</span>
          <strong>{weather.current.low}℃</strong>
        </div>
        <div>
          <span className="metric-label">降水</span>
          <strong>{weather.current.precipitationProbability}%</strong>
        </div>
      </div>

      <div className="data-note">
        {weather.isMock ? 'DEMO DATA' : 'OPEN-METEO'} / 更新 {new Date(weather.lastUpdated).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </section>
  );
}
