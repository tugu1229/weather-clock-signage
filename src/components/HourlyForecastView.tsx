import type { HourlyForecast } from '../types';
import { WeatherIcon } from './WeatherIcon';

type HourlyForecastViewProps = {
  items: HourlyForecast[];
};

export function HourlyForecastView({ items }: HourlyForecastViewProps) {
  return (
    <section className="forecast-view" aria-label="今日の時間別天気">
      <header className="forecast-header">
        <span>Today</span>
        <h1>今日の時間別天気</h1>
      </header>
      <div className="hourly-grid">
        {items.map((item) => (
          <article className="hourly-item" key={item.time}>
            <time>{item.time}</time>
            <WeatherIcon code={item.condition} size="medium" />
            <strong>{item.temperature}℃</strong>
            <span className="rain-rate">降水 {item.precipitationProbability}%</span>
          </article>
        ))}
      </div>
    </section>
  );
}
