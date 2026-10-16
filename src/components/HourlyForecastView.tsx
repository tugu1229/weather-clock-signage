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
      <div className="timeline">
        {items.map((item) => (
          <div className="tl-col" key={item.time}>
            <div className="tl-top">
              <WeatherIcon code={item.condition} size="medium" colored />
              <strong className="tl-temp">{item.temperature}℃</strong>
            </div>
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-bot">
              <time>{item.time}</time>
              <span className={`rain-rate ${item.precipitationProbability >= 50 ? 'is-wet' : ''}`}>
                降水 {item.precipitationProbability}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
