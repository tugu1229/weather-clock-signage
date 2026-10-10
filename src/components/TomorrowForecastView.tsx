import { weatherMeta } from '../lib/weatherMeta';
import type { DailyForecast } from '../types';
import { WeatherIcon } from './WeatherIcon';

type TomorrowForecastViewProps = {
  item: DailyForecast;
};

export function TomorrowForecastView({ item }: TomorrowForecastViewProps) {
  const meta = weatherMeta[item.condition];

  return (
    <section className="forecast-view tomorrow-view" aria-label="明日の天気">
      <header className="forecast-header">
        <span>Tomorrow</span>
        <h1>明日の天気</h1>
      </header>
      <div className="tomorrow-main">
        <div className="tomorrow-copy">
          <time>{item.date}（{item.weekday}）</time>
          <strong>{meta.label}</strong>
        </div>
        <WeatherIcon code={item.condition} size="hero" />
        <div className="tomorrow-metrics">
          <div>
            <span>最高気温</span>
            <strong>{item.high}℃</strong>
          </div>
          <div>
            <span>最低気温</span>
            <strong>{item.low}℃</strong>
          </div>
          <div>
            <span>降水確率</span>
            <strong>{item.precipitationProbability}%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
