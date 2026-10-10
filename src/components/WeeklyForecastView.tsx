import type { DailyForecast } from '../types';
import { WeatherIcon } from './WeatherIcon';

type WeeklyForecastViewProps = {
  items: DailyForecast[];
};

export function WeeklyForecastView({ items }: WeeklyForecastViewProps) {
  return (
    <section className="forecast-view" aria-label="週間天気予報">
      <header className="forecast-header">
        <span>Weekly</span>
        <h1>週間天気予報</h1>
      </header>
      <div className="weekly-grid">
        {items.map((item) => (
          <article className="weekly-item" key={item.date}>
            <div className="weekly-date">
              <strong>{item.date}</strong>
              <span>{item.weekday}</span>
            </div>
            <WeatherIcon code={item.condition} size="small" />
            <div className="weekly-temp">
              <span className="high">{item.high}℃</span>
              <span className="low">{item.low}℃</span>
            </div>
            <span className="rain-rate">{item.precipitationProbability}%</span>
          </article>
        ))}
      </div>
    </section>
  );
}
